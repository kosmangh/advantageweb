import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OccupantProperty } from 'src/app/@models/occupancy/occupant-property';
import { RemoveHyphenPipe } from "../../pipes/remove-hyphen.pipe";

@Component({
    selector: 'app-occupant-property-details',
    standalone: true,
    templateUrl: './occupant-property-details.component.html',
    imports: [CommonModule, RemoveHyphenPipe]
})
export class OccupantPropertyDetailsComponent {

    @Input() occupantDetails: OccupantProperty;

}
