const gulp = require("gulp");
const { RunBackstop } = require("./backstop-util");
const rimraf = require("rimraf");

const SCENARIOS = [
    {
        label: "Homepage",
        url: "http://colonial.sitecore.local",
        hideSelectors: [],
        removeSelectors: [],
        selectors: [
            "document"
        ]
    },
    {
        label: "Header",
        url: "http://colonial.sitecore.local",
        selectors: [
            ".page-header",
            ".primary-nav"
        ]
    },
    {
        label: "Audience Navigation",
        url: "http://colonial.sitecore.local",
        selectors: [
            "document",
            ".section-nav .content-container"
        ],
        actions: [
            {
                type: "click",
                selector: ".section-nav__selected-item"
            }
        ]
    },
    {
        label: "Mobile Navigation",
        url: "http://colonial.sitecore.local",
        selectors: [
            "viewport",
            ".page-header__nav-wrapper"
        ],
        actions: [
            {
                type: "click",
                selector: ".page-header__menu"
            }
        ]
    }
];

gulp.task("clean", (cb) => {
    rimraf("./backstop_data/bitmaps_reference", cb);
});

gulp.task("test:reference", ["clean"], () => {
    return RunBackstop("reference", SCENARIOS);
});

gulp.task("test", () => {
    return RunBackstop("test", SCENARIOS);
});

gulp.task("test:approve", () => {
    return RunBackstop("approve");
});