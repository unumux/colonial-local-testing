const backstop = require("backstopjs");
const _ = require("lodash");

const VIEWPORTS = [{
    name: "phone",
    width: 320,
    height: 480
}, {
    name: "phone_plus",
    width: 414,
    height: 736
}, {
    name: "tablet_v",
    width: 768,
    height: 1024
}, {
    name: "tablet_h",
    width: 1024,
    height: 768
}, {
    name: "desktop_1",
    width: 1150,
    height: 920
}, {
    name: "desktop_2",
    width: 1300,
    height: 1024
}, {
    name: "desktop_3",
    width: 1600,
    height: 1024
}, {
    name: "desktop_4",
    width: 1960,
    height: 1024
}];

const SCENARIO_DEFAULTS = {
    delay: 100
}

const DEFAULT_CONFIG = {  
    viewports: VIEWPORTS,
    paths: {
        bitmaps_reference: `./backstop_data/bitmaps_reference`,
        bitmaps_test: `./backstop_data/bitmaps_test`,
        compare_data: `./backstop_data/bitmaps_test/compare.json`,
        casper_scripts: "./backstop_data/casper_scripts"
    },
    onBeforeScript: "chromy/onBefore.js",
    onReadyScript: "chromy/onReady.js",
    engine: "chrome",
    report: ["browser"],
    cliExitOnFail: false,
    debug: false,
    port: 3001,
    asyncCaptureLimit: 10,
    asyncCompareLimit: 100
};

// function createConfig(viewports, scenarios) {
//     const pathKey = viewports.map(viewport => viewport.name).join("--");
//     return {  
//         viewports,
//         scenarios,
//         paths: {
//             bitmaps_reference: `./backstop_data/bitmaps_reference/${pathKey}`,
//             bitmaps_test: `./backstop_data/bitmaps_test/${pathKey}`,
//             compare_data: `./backstop_data/bitmaps_test/${pathKey}/compare.json`,
//             casper_scripts: "./backstop_data/casper_scripts"
//         },
//         onBeforeScript: "chromy/onBefore.js",
//         onReadyScript: "chromy/onReady.js",
//         engine: "chrome",
//         report: ["browser"],
//         cliExitOnFail: false,
//         debug: false,
//         port: 3001,
//         asyncCaptureLimit: 10,
//         asyncCompareLimit: 100
//     };
// }

// function getConfigForScenarios(viewportKey, scenarios) {
//     const viewports = viewportKey.trim().length === 0 ? VIEWPORTS : viewportKey.split(",").map(name => _.find(VIEWPORTS, { name }));
//     return createConfig(viewports, scenarios);
// }

// function buildBackstopConfigs(scenarios) {
//     const scenariosWithDefaults = scenarios.map(scenario => Object.assign({}, SCENARIO_DEFAULTS, scenario));
//     // console.log(scenariosWithDefaults);
//     const groupedScenarios = 
//        _.chain(scenariosWithDefaults)
//         .reduce((prev, scenario) => {
//             const nestedScenarios = scenario.scenarios ? scenario.scenarios.map(nestedScenario => Object.assign({}, SCENARIO_DEFAULTS, scenario, nestedScenario)) : [];
//             return [...prev, scenario, ...nestedScenarios];
//         }, [])
//         .map((item) => {
//             return _.omit(item, ["scenarios"]);
//         })
//         .groupBy(({viewports = []}) => viewports.join(","))
//         .value()

//         return Object.keys(groupedScenarios).map((key) => {
//         return getConfigForScenarios(key, groupedScenarios[key]);
//     });
// };

function RunBackstop(cmd, scenarios) {
    // let configs = buildBackstopConfigs(scenarios);

    // for(let i = 0; i < configs.length; i++) {
    //     await backstop(cmd, { config: configs[i] });
    // }

    if(cmd === "approve") {
        return backstop(cmd);
    }

    return backstop(cmd, { config: Object.assign({}, DEFAULT_CONFIG, { scenarios })});
}

module.exports = {
    RunBackstop
};