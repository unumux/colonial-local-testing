module.exports = function (chromy, {actions = [], ...scenario}, vp) {
  console.log('SCENARIO > ' + scenario.label);
//   require('./clickAndHoverHelper')(chromy, scenario);
  actions.forEach((action) => {
      runAction(action);
  })
  

  function runAction(action) {
        switch (action.type) {
            case "hover":
                chromy
                    .wait(action.selector)
                    .rect(action.selector)
                    .result(function (rect) {
                        chromy.mouseMoved(rect.left, rect.top);
                    });
                break;
            case "click":
                chromy
                    .wait(action.selector)
                    .click(action.selector);
        }

        chromy.wait(1000);
    }
};


