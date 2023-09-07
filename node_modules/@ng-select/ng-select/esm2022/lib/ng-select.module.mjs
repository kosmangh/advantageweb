import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgDropdownPanelComponent } from './ng-dropdown-panel.component';
import { NgOptionComponent } from './ng-option.component';
import { NgSelectComponent, SELECTION_MODEL_FACTORY } from './ng-select.component';
import { NgFooterTemplateDirective, NgHeaderTemplateDirective, NgLabelTemplateDirective, NgLoadingSpinnerTemplateDirective, NgLoadingTextTemplateDirective, NgMultiLabelTemplateDirective, NgNotFoundTemplateDirective, NgOptgroupTemplateDirective, NgOptionTemplateDirective, NgTagTemplateDirective, NgItemLabelDirective, NgTypeToSearchTemplateDirective } from './ng-templates.directive';
import { DefaultSelectionModelFactory } from './selection-model';
import * as i0 from "@angular/core";
class NgSelectModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.1", ngImport: i0, type: NgSelectModule, declarations: [NgDropdownPanelComponent,
            NgOptionComponent,
            NgSelectComponent,
            NgOptgroupTemplateDirective,
            NgOptionTemplateDirective,
            NgLabelTemplateDirective,
            NgMultiLabelTemplateDirective,
            NgHeaderTemplateDirective,
            NgFooterTemplateDirective,
            NgNotFoundTemplateDirective,
            NgTypeToSearchTemplateDirective,
            NgLoadingTextTemplateDirective,
            NgTagTemplateDirective,
            NgLoadingSpinnerTemplateDirective,
            NgItemLabelDirective], imports: [CommonModule], exports: [NgSelectComponent,
            NgOptionComponent,
            NgOptgroupTemplateDirective,
            NgOptionTemplateDirective,
            NgLabelTemplateDirective,
            NgMultiLabelTemplateDirective,
            NgHeaderTemplateDirective,
            NgFooterTemplateDirective,
            NgNotFoundTemplateDirective,
            NgTypeToSearchTemplateDirective,
            NgLoadingTextTemplateDirective,
            NgTagTemplateDirective,
            NgLoadingSpinnerTemplateDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgSelectModule, providers: [
            { provide: SELECTION_MODEL_FACTORY, useValue: DefaultSelectionModelFactory }
        ], imports: [CommonModule] }); }
}
export { NgSelectModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NgDropdownPanelComponent,
                        NgOptionComponent,
                        NgSelectComponent,
                        NgOptgroupTemplateDirective,
                        NgOptionTemplateDirective,
                        NgLabelTemplateDirective,
                        NgMultiLabelTemplateDirective,
                        NgHeaderTemplateDirective,
                        NgFooterTemplateDirective,
                        NgNotFoundTemplateDirective,
                        NgTypeToSearchTemplateDirective,
                        NgLoadingTextTemplateDirective,
                        NgTagTemplateDirective,
                        NgLoadingSpinnerTemplateDirective,
                        NgItemLabelDirective
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        NgSelectComponent,
                        NgOptionComponent,
                        NgOptgroupTemplateDirective,
                        NgOptionTemplateDirective,
                        NgLabelTemplateDirective,
                        NgMultiLabelTemplateDirective,
                        NgHeaderTemplateDirective,
                        NgFooterTemplateDirective,
                        NgNotFoundTemplateDirective,
                        NgTypeToSearchTemplateDirective,
                        NgLoadingTextTemplateDirective,
                        NgTagTemplateDirective,
                        NgLoadingSpinnerTemplateDirective
                    ],
                    providers: [
                        { provide: SELECTION_MODEL_FACTORY, useValue: DefaultSelectionModelFactory }
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VsZWN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9uZy1zZWxlY3QvbGliL25nLXNlbGVjdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkYsT0FBTyxFQUNILHlCQUF5QixFQUN6Qix5QkFBeUIsRUFDekIsd0JBQXdCLEVBQ3hCLGlDQUFpQyxFQUNqQyw4QkFBOEIsRUFDOUIsNkJBQTZCLEVBQzdCLDJCQUEyQixFQUMzQiwyQkFBMkIsRUFDM0IseUJBQXlCLEVBQ3pCLHNCQUFzQixFQUN0QixvQkFBb0IsRUFDcEIsK0JBQStCLEVBQ2xDLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBRWpFLE1Bd0NhLGNBQWM7OEdBQWQsY0FBYzsrR0FBZCxjQUFjLGlCQXRDdkIsd0JBQXdCO1lBQ3hCLGlCQUFpQjtZQUNqQixpQkFBaUI7WUFDakIsMkJBQTJCO1lBQzNCLHlCQUF5QjtZQUN6Qix3QkFBd0I7WUFDeEIsNkJBQTZCO1lBQzdCLHlCQUF5QjtZQUN6Qix5QkFBeUI7WUFDekIsMkJBQTJCO1lBQzNCLCtCQUErQjtZQUMvQiw4QkFBOEI7WUFDOUIsc0JBQXNCO1lBQ3RCLGlDQUFpQztZQUNqQyxvQkFBb0IsYUFHcEIsWUFBWSxhQUdaLGlCQUFpQjtZQUNqQixpQkFBaUI7WUFDakIsMkJBQTJCO1lBQzNCLHlCQUF5QjtZQUN6Qix3QkFBd0I7WUFDeEIsNkJBQTZCO1lBQzdCLHlCQUF5QjtZQUN6Qix5QkFBeUI7WUFDekIsMkJBQTJCO1lBQzNCLCtCQUErQjtZQUMvQiw4QkFBOEI7WUFDOUIsc0JBQXNCO1lBQ3RCLGlDQUFpQzsrR0FNeEIsY0FBYyxhQUpaO1lBQ1gsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsUUFBUSxFQUFFLDRCQUE0QixFQUFFO1NBQzNFLFlBbkJELFlBQVk7O1NBcUJILGNBQWM7MkZBQWQsY0FBYztrQkF4QzFCLFFBQVE7bUJBQUM7b0JBQ04sWUFBWSxFQUFFO3dCQUNkLHdCQUF3Qjt3QkFDeEIsaUJBQWlCO3dCQUNqQixpQkFBaUI7d0JBQ2pCLDJCQUEyQjt3QkFDM0IseUJBQXlCO3dCQUN6Qix3QkFBd0I7d0JBQ3hCLDZCQUE2Qjt3QkFDN0IseUJBQXlCO3dCQUN6Qix5QkFBeUI7d0JBQ3pCLDJCQUEyQjt3QkFDM0IsK0JBQStCO3dCQUMvQiw4QkFBOEI7d0JBQzlCLHNCQUFzQjt3QkFDdEIsaUNBQWlDO3dCQUNqQyxvQkFBb0I7cUJBQ25CO29CQUNELE9BQU8sRUFBRTt3QkFDVCxZQUFZO3FCQUNYO29CQUNELE9BQU8sRUFBRTt3QkFDVCxpQkFBaUI7d0JBQ2pCLGlCQUFpQjt3QkFDakIsMkJBQTJCO3dCQUMzQix5QkFBeUI7d0JBQ3pCLHdCQUF3Qjt3QkFDeEIsNkJBQTZCO3dCQUM3Qix5QkFBeUI7d0JBQ3pCLHlCQUF5Qjt3QkFDekIsMkJBQTJCO3dCQUMzQiwrQkFBK0I7d0JBQy9CLDhCQUE4Qjt3QkFDOUIsc0JBQXNCO3dCQUN0QixpQ0FBaUM7cUJBQ2hDO29CQUNELFNBQVMsRUFBRTt3QkFDWCxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsNEJBQTRCLEVBQUU7cUJBQzNFO2lCQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0Ryb3Bkb3duUGFuZWxDb21wb25lbnQgfSBmcm9tICcuL25nLWRyb3Bkb3duLXBhbmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ09wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vbmctb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ1NlbGVjdENvbXBvbmVudCwgU0VMRUNUSU9OX01PREVMX0ZBQ1RPUlkgfSBmcm9tICcuL25nLXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgICBOZ0Zvb3RlclRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIE5nSGVhZGVyVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgTmdMYWJlbFRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIE5nTG9hZGluZ1NwaW5uZXJUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBOZ0xvYWRpbmdUZXh0VGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgTmdNdWx0aUxhYmVsVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgTmdOb3RGb3VuZFRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIE5nT3B0Z3JvdXBUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBOZ09wdGlvblRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIE5nVGFnVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgTmdJdGVtTGFiZWxEaXJlY3RpdmUsXG4gICAgTmdUeXBlVG9TZWFyY2hUZW1wbGF0ZURpcmVjdGl2ZVxufSBmcm9tICcuL25nLXRlbXBsYXRlcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGVmYXVsdFNlbGVjdGlvbk1vZGVsRmFjdG9yeSB9IGZyb20gJy4vc2VsZWN0aW9uLW1vZGVsJztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOZ0Ryb3Bkb3duUGFuZWxDb21wb25lbnQsXG4gICAgTmdPcHRpb25Db21wb25lbnQsXG4gICAgTmdTZWxlY3RDb21wb25lbnQsXG4gICAgTmdPcHRncm91cFRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIE5nT3B0aW9uVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgTmdMYWJlbFRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIE5nTXVsdGlMYWJlbFRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIE5nSGVhZGVyVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgTmdGb290ZXJUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBOZ05vdEZvdW5kVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgTmdUeXBlVG9TZWFyY2hUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBOZ0xvYWRpbmdUZXh0VGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgTmdUYWdUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBOZ0xvYWRpbmdTcGlubmVyVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgTmdJdGVtTGFiZWxEaXJlY3RpdmVcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICBOZ1NlbGVjdENvbXBvbmVudCxcbiAgICBOZ09wdGlvbkNvbXBvbmVudCxcbiAgICBOZ09wdGdyb3VwVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgTmdPcHRpb25UZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBOZ0xhYmVsVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgTmdNdWx0aUxhYmVsVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgTmdIZWFkZXJUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBOZ0Zvb3RlclRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIE5nTm90Rm91bmRUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBOZ1R5cGVUb1NlYXJjaFRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIE5nTG9hZGluZ1RleHRUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBOZ1RhZ1RlbXBsYXRlRGlyZWN0aXZlLFxuICAgIE5nTG9hZGluZ1NwaW5uZXJUZW1wbGF0ZURpcmVjdGl2ZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBTRUxFQ1RJT05fTU9ERUxfRkFDVE9SWSwgdXNlVmFsdWU6IERlZmF1bHRTZWxlY3Rpb25Nb2RlbEZhY3RvcnkgfVxuICAgIF1cbiAgICB9KVxuZXhwb3J0IGNsYXNzIE5nU2VsZWN0TW9kdWxlIHt9XG4iXX0=