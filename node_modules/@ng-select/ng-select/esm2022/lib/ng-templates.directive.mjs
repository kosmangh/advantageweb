import { Directive, Input } from '@angular/core';
import { escapeHTML } from './value-utils';
import * as i0 from "@angular/core";
class NgItemLabelDirective {
    constructor(element) {
        this.element = element;
        this.escape = true;
    }
    ngOnChanges(changes) {
        this.element.nativeElement.innerHTML = this.escape ?
            escapeHTML(this.ngItemLabel) :
            this.ngItemLabel;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgItemLabelDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.1", type: NgItemLabelDirective, selector: "[ngItemLabel]", inputs: { ngItemLabel: "ngItemLabel", escape: "escape" }, usesOnChanges: true, ngImport: i0 }); }
}
export { NgItemLabelDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgItemLabelDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ngItemLabel]' }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { ngItemLabel: [{
                type: Input
            }], escape: [{
                type: Input
            }] } });
// eslint-disable-next-line @angular-eslint/directive-selector
class NgOptionTemplateDirective {
    constructor(template) {
        this.template = template;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgOptionTemplateDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.1", type: NgOptionTemplateDirective, selector: "[ng-option-tmp]", ngImport: i0 }); }
}
export { NgOptionTemplateDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgOptionTemplateDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ng-option-tmp]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
// eslint-disable-next-line @angular-eslint/directive-selector
class NgOptgroupTemplateDirective {
    constructor(template) {
        this.template = template;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgOptgroupTemplateDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.1", type: NgOptgroupTemplateDirective, selector: "[ng-optgroup-tmp]", ngImport: i0 }); }
}
export { NgOptgroupTemplateDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgOptgroupTemplateDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ng-optgroup-tmp]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
// eslint-disable-next-line @angular-eslint/directive-selector
class NgLabelTemplateDirective {
    constructor(template) {
        this.template = template;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgLabelTemplateDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.1", type: NgLabelTemplateDirective, selector: "[ng-label-tmp]", ngImport: i0 }); }
}
export { NgLabelTemplateDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgLabelTemplateDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ng-label-tmp]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
// eslint-disable-next-line @angular-eslint/directive-selector
class NgMultiLabelTemplateDirective {
    constructor(template) {
        this.template = template;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMultiLabelTemplateDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.1", type: NgMultiLabelTemplateDirective, selector: "[ng-multi-label-tmp]", ngImport: i0 }); }
}
export { NgMultiLabelTemplateDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMultiLabelTemplateDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ng-multi-label-tmp]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
// eslint-disable-next-line @angular-eslint/directive-selector
class NgHeaderTemplateDirective {
    constructor(template) {
        this.template = template;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgHeaderTemplateDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.1", type: NgHeaderTemplateDirective, selector: "[ng-header-tmp]", ngImport: i0 }); }
}
export { NgHeaderTemplateDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgHeaderTemplateDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ng-header-tmp]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
// eslint-disable-next-line @angular-eslint/directive-selector
class NgFooterTemplateDirective {
    constructor(template) {
        this.template = template;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgFooterTemplateDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.1", type: NgFooterTemplateDirective, selector: "[ng-footer-tmp]", ngImport: i0 }); }
}
export { NgFooterTemplateDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgFooterTemplateDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ng-footer-tmp]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
// eslint-disable-next-line @angular-eslint/directive-selector
class NgNotFoundTemplateDirective {
    constructor(template) {
        this.template = template;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgNotFoundTemplateDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.1", type: NgNotFoundTemplateDirective, selector: "[ng-notfound-tmp]", ngImport: i0 }); }
}
export { NgNotFoundTemplateDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgNotFoundTemplateDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ng-notfound-tmp]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
// eslint-disable-next-line @angular-eslint/directive-selector
class NgTypeToSearchTemplateDirective {
    constructor(template) {
        this.template = template;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgTypeToSearchTemplateDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.1", type: NgTypeToSearchTemplateDirective, selector: "[ng-typetosearch-tmp]", ngImport: i0 }); }
}
export { NgTypeToSearchTemplateDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgTypeToSearchTemplateDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ng-typetosearch-tmp]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
// eslint-disable-next-line @angular-eslint/directive-selector
class NgLoadingTextTemplateDirective {
    constructor(template) {
        this.template = template;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgLoadingTextTemplateDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.1", type: NgLoadingTextTemplateDirective, selector: "[ng-loadingtext-tmp]", ngImport: i0 }); }
}
export { NgLoadingTextTemplateDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgLoadingTextTemplateDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ng-loadingtext-tmp]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
// eslint-disable-next-line @angular-eslint/directive-selector
class NgTagTemplateDirective {
    constructor(template) {
        this.template = template;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgTagTemplateDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.1", type: NgTagTemplateDirective, selector: "[ng-tag-tmp]", ngImport: i0 }); }
}
export { NgTagTemplateDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgTagTemplateDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ng-tag-tmp]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
// eslint-disable-next-line @angular-eslint/directive-selector
class NgLoadingSpinnerTemplateDirective {
    constructor(template) {
        this.template = template;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgLoadingSpinnerTemplateDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.1", type: NgLoadingSpinnerTemplateDirective, selector: "[ng-loadingspinner-tmp]", ngImport: i0 }); }
}
export { NgLoadingSpinnerTemplateDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgLoadingSpinnerTemplateDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ng-loadingspinner-tmp]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdGVtcGxhdGVzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9uZy1zZWxlY3QvbGliL25nLXRlbXBsYXRlcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxLQUFLLEVBQXlDLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTNDLE1BQ2Esb0JBQW9CO0lBSTdCLFlBQW9CLE9BQWdDO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBRjNDLFdBQU0sR0FBRyxJQUFJLENBQUM7SUFFaUMsQ0FBQztJQUV6RCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoRCxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN6QixDQUFDOzhHQVZRLG9CQUFvQjtrR0FBcEIsb0JBQW9COztTQUFwQixvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFEaEMsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUU7aUdBRTNCLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLOztBQVdWLDhEQUE4RDtBQUM5RCxNQUNhLHlCQUF5QjtJQUNsQyxZQUFtQixRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtJQUFJLENBQUM7OEdBRHpDLHlCQUF5QjtrR0FBekIseUJBQXlCOztTQUF6Qix5QkFBeUI7MkZBQXpCLHlCQUF5QjtrQkFEckMsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRTs7QUFLMUMsOERBQThEO0FBQzlELE1BQ2EsMkJBQTJCO0lBQ3BDLFlBQW1C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UzttQkFBQyxFQUFFLFFBQVEsRUFBRSx5QkFBeUIsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGVzY2FwZUhUTUwgfSBmcm9tICcuL3ZhbHVlLXV0aWxzJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nSXRlbUxhYmVsXScgfSlcbmV4cG9ydCBjbGFzcyBOZ0l0ZW1MYWJlbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgbmdJdGVtTGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSBlc2NhcGUgPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PikgeyB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuZXNjYXBlID9cbiAgICAgICAgICAgIGVzY2FwZUhUTUwodGhpcy5uZ0l0ZW1MYWJlbCkgOlxuICAgICAgICAgICAgdGhpcy5uZ0l0ZW1MYWJlbDtcbiAgICB9XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLXNlbGVjdG9yXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmctb3B0aW9uLXRtcF0nIH0pXG5leHBvcnQgY2xhc3MgTmdPcHRpb25UZW1wbGF0ZURpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7IH1cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtc2VsZWN0b3JcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZy1vcHRncm91cC10bXBdJyB9KVxuZXhwb3J0IGNsYXNzIE5nT3B0Z3JvdXBUZW1wbGF0ZURpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7IH1cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtc2VsZWN0b3JcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZy1sYWJlbC10bXBdJyB9KVxuZXhwb3J0IGNsYXNzIE5nTGFiZWxUZW1wbGF0ZURpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7IH1cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtc2VsZWN0b3JcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZy1tdWx0aS1sYWJlbC10bXBdJyB9KVxuZXhwb3J0IGNsYXNzIE5nTXVsdGlMYWJlbFRlbXBsYXRlRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHsgfVxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1zZWxlY3RvclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nLWhlYWRlci10bXBdJyB9KVxuZXhwb3J0IGNsYXNzIE5nSGVhZGVyVGVtcGxhdGVEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PikgeyB9XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLXNlbGVjdG9yXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmctZm9vdGVyLXRtcF0nIH0pXG5leHBvcnQgY2xhc3MgTmdGb290ZXJUZW1wbGF0ZURpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7IH1cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtc2VsZWN0b3JcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZy1ub3Rmb3VuZC10bXBdJyB9KVxuZXhwb3J0IGNsYXNzIE5nTm90Rm91bmRUZW1wbGF0ZURpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7IH1cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtc2VsZWN0b3JcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZy10eXBldG9zZWFyY2gtdG1wXScgfSlcbmV4cG9ydCBjbGFzcyBOZ1R5cGVUb1NlYXJjaFRlbXBsYXRlRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHsgfVxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1zZWxlY3RvclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nLWxvYWRpbmd0ZXh0LXRtcF0nIH0pXG5leHBvcnQgY2xhc3MgTmdMb2FkaW5nVGV4dFRlbXBsYXRlRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHsgfVxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1zZWxlY3RvclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nLXRhZy10bXBdJyB9KVxuZXhwb3J0IGNsYXNzIE5nVGFnVGVtcGxhdGVEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PikgeyB9XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLXNlbGVjdG9yXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmctbG9hZGluZ3NwaW5uZXItdG1wXScgfSlcbmV4cG9ydCBjbGFzcyBOZ0xvYWRpbmdTcGlubmVyVGVtcGxhdGVEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PikgeyB9XG59XG4iXX0=