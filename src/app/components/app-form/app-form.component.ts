import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppDataService} from '../../services/data/app-data.service';
import AppServerResponse from '../../models/AppServerResponse';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['app-form.component.scss']
})
export class AppFormComponent implements OnInit {

  public form = new FormGroup({
    date: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
  });

  public responseData;
  public columnsToDisplay: string[] = ['name', 'date'];

  constructor(
    public dataService: AppDataService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { response: AppServerResponse }) => {
        if (data.response.success) {
          this.handleSuccess(data.response, false);
        } else {
          this.handleError(data.response.error);
        }
      },
    );
  }

  handleSubmit(event): void {
    event.preventDefault();
    this.responseData = null;
    this.dataService.sendData(this.form.value).subscribe(
      (response: AppServerResponse) => this.handleSuccess(response, true),
      (error) => this.handleError(error),
    );
  }

  alert(message: string): void {
    this.snackBar.open(message);
  }

  handleSuccess(response: AppServerResponse, flag: boolean): void {
    if (!response) {
      return;
    }
    if (response.success) {
      this.responseData = response.data;
      // *ОБсуждаемо*
      // flag === true - данные подставляются из формы в query params
      // иначе - наоборот, из параметров в форму
      // этот функционал НЕ работает через Resolver
      // т.к. формы еще нет на момент инициализации
      // возможно стоит сохранять данные до отрисовки формы и вставлять их в неё,
      // но я не уверен, что это кому-нибудь нужно
      // оставлю на будущее))
      if (flag) {
        const url = this.router.createUrlTree(
          [],
          {
            relativeTo: this.route,
            queryParams: {
              ...this.form.value
            }
          }).toString();
        this.location.go(url);
      } else {
        this.form.patchValue(this.route.queryParams);
      }
    }
  }

  handleError(error): void {
    if (!error) {
      return;
    }
    if (error.status >= 400 && error.status <= 499) {
      const errorList = error.error.error;
      for (const key in errorList) {
        if (errorList.hasOwnProperty(key)) {
          this.form.get(key).setErrors({serverError: {message: errorList[key].join(', ')}});
        }
      }
    } else {
      this.alert('Something goes wrong with server');
      return;
    }
  }
}
