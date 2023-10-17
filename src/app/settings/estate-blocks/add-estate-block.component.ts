import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { RequiredFieldComponent } from 'src/app/@shared/components/required-field.component';
import { RequiredFieldsNoticeComponent } from 'src/app/@shared/components/required-fields-notice.component';
import { Title } from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { User } from 'src/app/@models/user';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { SettingsService } from 'src/app/@services/settings.service';
import Swal from 'sweetalert2';
import { Estate } from 'src/app/@models/settings/estate';
import { EstateBlock } from 'src/app/@models/settings/estate-block';
import { EstateListResponse } from 'src/app/@restmodels/settings/estate-list.response';

@Component({
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule, CalendarModule,
    RequiredFieldsNoticeComponent, FormLabelComponent, RequiredFieldComponent ],
  templateUrl: './add-estate-block.component.html'
})
export class AddEstateBlockComponent implements OnInit {


  currentUser: User;
  listOfEstates: Estate[];
  estateBlock: EstateBlock;
  searchedKeyword: string;
  estateBlockFormGroup?: FormGroup;
  estateHeaderMsg: string;
  isAddMode: boolean;
  estateModalService: BsModalService;
  submitted: boolean = false;

  constructor(
    private title: Title,
    public addEstateBsModalRef: BsModalRef,
    private fb: FormBuilder,
    private accountService: AuthService,
    private alertService: AlertService,
    private logger: NGXLogger,
    private settingsService: SettingsService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }



  ngOnInit(): void {

    this.createNewForm();
    if (this.isAddMode) {
      this.estateHeaderMsg = 'New estate block';
      this.title.setTitle(this.estateHeaderMsg);
    } else {
      this.estateHeaderMsg = 'Edit ' + this.estateBlock.block + ' block';
      this.title.setTitle(this.estateHeaderMsg);
      this.estateBlockFormGroup.patchValue(this.estateBlock);
    }
    this.addEstateBsModalRef.setClass("gray modal-sm modal-dialog-top");
    this.fetchEstates();
  }


  createNewForm(): void {
    this.estateBlockFormGroup = this.fb.group({
      estateId: [ '', [ Validators.required ] ],
      block: [ '', { updateOn: 'blur', validators: [ Validators.required, Validators.minLength(1) ] } ],
      blockSize: [ '', { updateOn: 'blur', validators: [ Validators.required, Validators.minLength(3) ] } ],
      remarks: [ '', '' ],
      recordId: [ '', ],
      saveAndNew: [ false, ]
    });
  }
  get estateBlockForm() { return this.estateBlockFormGroup.controls; }

  fetchEstates(): void {
    this.listOfEstates = [];
    this.settingsService.getEstates().subscribe({
      next: (res: EstateListResponse) => {
        this.logger.info(`getEstates response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.estates.length <= 0) {
          this.alertService.showInfoMsgGeneral("No zones found");
          this.logger.info("No zones found");
          return;
        }
        this.listOfEstates = res.estates;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }


  saveBlock(): void {
    this.alertService.clear();
    this.submitted = true;
    if (!this.estateBlockFormGroup.valid) {
      return;
    }
    let block = this.estateBlockForm.block.value.toUpperCase();
    // block = block.toUpperCase();
    Swal.fire({
      title: `Confirmation`,
      text: `Do you want to create block  ${block}?`,
      icon: 'question',
      position: 'top',
      showCancelButton: true,
      confirmButtonText: 'Yes, create',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.value) {
        this.alertService.clear();
        // stop here if userFormGroup is invalid
        if (this.estateBlockFormGroup.invalid) {
          return;
        }
        this.settingsService.createEstateBlock(this.currentUser, this.estateBlockFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse): void => {
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${block} block created successfully`);
              if (!this.estateBlockForm.saveAndNew.value) {
                this.addEstateBsModalRef.hide();
                this.accountService.reloadCurrentRoute();

              }
              this.estateBlockFormGroup.reset();
             
              this.submitted =false;
              this.logAction(`created block ${block}`, PortalMenus.SETTINGS);
            },
            error: error => {
              this.alertService.showInfoMsg(error);
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  updateBlock(): void {
    this.alertService.clear();
    this.submitted = true;
    if (!this.estateBlockFormGroup.valid) {
      return;
    }
    let block = this.estateBlockForm.block.value;


    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to update block ${block}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, update',
    }).then((result) => {
      if (result.value) {
        // reset alerts on submit
        this.alertService.clear();
        // stop here if userFormGroup is invalid
        if (this.estateBlockFormGroup.invalid) {
          return;
        }
        this.settingsService.updateEstateBlock(this.currentUser, this.estateBlockFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('updateEstateBlock response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${block} block updated successfully`);
              this.addEstateBsModalRef.hide();
              this.logAction(`Updated ${block}`, PortalMenus.SETTINGS);
              localStorage.setItem('estate', this.estateBlockFormGroup.value.estateId);
              this.accountService.reloadCurrentRoute();
            },
            error: error => {
              this.alertService.showInfoMsg(error.message);
            }
          });

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });
  }
  deleteBlock(): void {
    let block = this.estateBlock.block;

    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to delete block ${block}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.value) {
        this.alertService.clear();
        if (this.estateBlockFormGroup.invalid) {
          return;
        }
        this.settingsService.deleteEstateBlock(this.currentUser, this.estateBlockForm.estateId.value)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('delete block response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${block} block deleted successfully`);
              this.addEstateBsModalRef.hide();
              this.logAction(`Deleted ${block}`, PortalMenus.SETTINGS);
              this.accountService.reloadCurrentRoute();
            },
            error: error => {
              this.alertService.showInfoMsg(error.message);
            }
          });

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });
  }





  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logUserAudit(msg, ui);
  }
}
