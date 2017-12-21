describe('swangular', function () {

    beforeEach(function() {
        browser.get('http://localhost:8899');
    });

    it('Everything is loaded properly', function () {

        expect(element(by.binding('vm.test')).getText()).toEqual('This string was injected from controller');

        expect(browser.getTitle()).toEqual('Swangular Tests');

    });
    
    it('opens base sweetalert2 modal', function () {

        element(by.id('btn1')).click();

        var title = $('.swal2-contentwrapper > .swal2-title').getText();
        var content = $('.swal2-content').getText();

        expect(title).toEqual('Title');
        expect(content).toEqual('Content');

    });

    it('loads a template without controller', function () {

        element(by.id('btn2')).click();

        expect($('.swal2-contentwrapper > .swal2-title').getText()).toEqual('Template test');
        expect(element(by.id('basictemplate')).getText()).toEqual('Basic template');

    });

    it('opens swangular with template', function () {

        element(by.id('btn3')).click();

        expect(element(by.binding('vm.content')).getText()).toEqual('This string was injected from modalcontroller');

    });

    it('opens swangular with scope', function () {

        element(by.id('btn4')).click();

        expect(element(by.binding('content')).getText()).toEqual('This string was injected from scope');

    });

    it('resolves and inject dependencies', function () {

        element(by.id('btn5')).click();

        expect(element(by.binding('content')).getText()).toEqual('This is resolved content');

    });

    it('executes a preConfirm method on controller that instantiates modal', function () {

        // Open modal
        element(by.id('btn6')).click();

        // Click confirm button
        element(by.css('.swal2-confirm')).click();

        // Check if preconfirm is executed
        expect(element(by.binding('vm.preConfirmContent')).getText()).toEqual('This string was injected by preConfirm');

    });

    it('executes a preConfirm method on modal controller', function () {

        // Open modal
        element(by.id('btn7')).click();

        // Click confirm button
        element(by.css('.swal2-confirm')).click();

        // Check if preconfirm is executed
        expect(element(by.binding('vm.modalPreConfirmContent')).getText()).toEqual('This string was injected by preConfirm');

    });

    it('executes a preConfirm method on when no controller is passed', function () {

        // Open modal
        element(by.id('btn8')).click();

        // Click confirm button
        element(by.css('.swal2-confirm')).click();

        // Check if preconfirm is executed
        expect(element(by.binding('vm.preConfirmContent')).getText()).toEqual('This string was injected by preConfirm');

    });

    it('can access a parent controller using the controllerAs syntax', function () {

        // Open modal
        element(by.id('btn9')).click();

        // Check if preconfirm is executed
        expect(element(by.binding('child.content')).getText()).toEqual('This string was injected from modalcontroller');
        expect(element(by.binding('parent.content')).getText()).toEqual('This string was injected from parent controller');

    });


});