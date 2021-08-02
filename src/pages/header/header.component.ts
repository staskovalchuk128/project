import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from "../../model/user.service";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: "app-header",
  moduleId: module.id,
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  loggedUser: boolean = false;
  user;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private userService: UserService){

  }

  ngOnInit() {

    this.userService.userData.pipe(takeUntil(this.destroy$))
    .subscribe(res=>{
      this.user = res;
      this.loggedUser = !this.user ? false : true;
    });


  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
