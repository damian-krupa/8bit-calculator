import { Calculator } from "./Calculator";

class DecCalculator extends Calculator{
    constructor(settings) {
        super(settings);
        console.log( this.getName() );
    }

    /* Method add numbers in two array
    *  @param {array} numberX First number
    *  @param {array} numberY Second number
    *  @return {array}
    */
    add(numberX, numberY) {
        let result = [0,0,0,0,0,0,0,0,0];
        for(let i = numberX.length - 1; i >= 0  ; i--) {
            let carryBit =  numberX[i] + numberY[i] + result[i];
            if( carryBit  === 10) {
                result[i] = 0;
                result[i-1] = 1;
            } else if (carryBit > 10 ){
                result[i] = numberX[i] + numberY[i] - 10;
                result[i-1] = 1;
            } else {
                result[i] = carryBit;
            }
        }
        return result;
    }

    /* Method changing number
    *  @param {jQuery element} root Parent element
    */
    changeNumber(root) {
        let activeElement = root.find('.active');
        activeElement.attr("contenteditable",'true');
        activeElement.trigger("focus");
    }

    /* Method changing Result
    */
    updateResult() {
        let root =  this.$calculatorDOMElement;
        let $resultNumber = root.children(".group-number").children(".result-bit");
        for(let i =  this.resultNumberArray.length - 1, j = 0; i >= 0 ; i--, j++) {
            let valueResult = parseInt( $resultNumber.eq(j).find(".active").text() );
            if( this.resultNumberArray[i] != valueResult ) {
                let activeElement = $resultNumber.eq(j).find(".active");
                activeElement.text(this.resultNumberArray[i]);
            }
        }
    }

    initEvents() {
        super.initEvents();
        this.$calculatorDOMElement.find(".operator-bar").on('click', () => {
            this.checkNumber();
            this.updateResult();
        })
    }
}

export {DecCalculator};
