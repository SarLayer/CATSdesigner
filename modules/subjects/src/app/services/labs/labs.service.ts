import { Store } from '@ngrx/store';
import { StudentMark } from './../../models/student-mark.model';
import { ConverterService } from './../converter.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Lab} from "../../models/lab.model";
import {LabsRestService} from './labs-rest.service';
import * as labSelectors from '../../store/selectors/labs.selectors';
import { IAppState } from 'src/app/store/state/app.state';

@Injectable({
  providedIn: 'root'
})

export class LabsService {

  constructor(
    private store: Store<IAppState>,
    private converterService: ConverterService,
              private rest: LabsRestService) {
  }

  public getCalendar() {
    return this.store.select(labSelectors.getLabsCalendar);
  }

  public getLabWork(subjectId: number): Observable<Lab[]> {
    return this.rest.getLabWork(subjectId);
  }

  public getMarks(subjectId: number, groupId: string): Observable<StudentMark[]> {
    return this.rest.getMarksV2(subjectId, groupId);
  }

  public createLab(lab: Lab) {
    return this.rest.createLab(this.converterService.labToCreateEntity(lab));
  }

  public deleteLab(lab: {id: string, subjectId: number}) {
    return this.rest.deleteLab(lab);
  }

  public setLabsVisitingDate(body) {
    return this.rest.setLabsVisitingDate(body);
  }

  public setLabsMark(body): Observable<any> {
    return this.rest.setLabsMark(body);
  }

  public getFilesLab(body: {subjectId: number, userId: number}): Observable<any> {
    return this.rest.getFilesLab(body);
  }

  public updateLabs(labs: Lab[]): Observable<any> {
    return this.rest.updateLabs(this.converterService.labsUpdateConverter(labs));
  }

  public deleteUserFile(body: {id: string}): Observable<any> {
    return this.rest.deleteUserFile(body);
  }

  public sendUserFile(body): Observable<any> {
    return this.rest.sendUserFile(body);
  }

  public getAllStudentFilesLab(subjectId: number, groupId: string): Observable<any> {
    return this.rest.getAllStudentFilesLab(subjectId, groupId);
  }

  public receivedLabFile(body: {userFileId: number}): Observable<any> {
    return this.rest.receivedLabFile(body);
  }

  public cancelReceivedLabFile(body: {userFileId: number}): Observable<any> {
    return this.rest.cancelReceivedLabFile(body);
  }

  public checkPlagiarism(body: {subjectId: string, userFileId: number}): Observable<any> {
    return this.rest.checkPlagiarism(body);
  }

  public checkPlagiarismSubjects(body: {subjectId: string, threshold: string, type: string}): Observable<any> {
    return this.rest.checkPlagiarismSubjects(body);
  }
}
