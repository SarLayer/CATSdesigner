import { Practical } from './../models/practical.model';
import { CreateEntity } from './../models/form/create-entity.model';
import {Injectable} from '@angular/core';
import {News} from '../models/news.model';
import {Attachment} from '../models/attachment.model';
import {Lecture} from '../models/lecture.model';
import {Calendar} from '../models/calendar.model';
import {Group, SubGroup} from "../models/group.model";
import {GroupsVisiting, LecturesMarksVisiting} from "../models/groupsVisiting.model";
import {Mark} from "../models/mark.model";
import {Lab, ScheduleProtectionLab, ScheduleProtectionLabsRecomend} from "../models/lab.model";
import { UpdateLab } from '../models/form/update-lab.model';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor() {
  }

  public newsModelConverter(news: any): News {
    const newNews = new News();
    newNews.id = news.NewsId;
    newNews.title = news.Title;
    newNews.body = news.Body;
    newNews.dateCreate = news.DateCreate;
    newNews.disabled = news.Disabled;
    newNews.subjectId = news.SubjectId;
    newNews.pathFile = news.PathFile;
    newNews.attachments = news.Attachments.map(attachment => this.attachmentModelConverter(attachment));
    return newNews;
  }

  public newsModelsConverter(news: any[]): News[] {
    return news.map(res => this.newsModelConverter(res));
  }

  private attachmentModelConverter(attachment: any): Attachment {
    const newAttachment = new Attachment();
    newAttachment.id = attachment.Id;
    newAttachment.attachmentType = attachment.AttachmentType;
    newAttachment.fileName = attachment.FileName;
    newAttachment.name = attachment.Name;
    newAttachment.pathName = attachment.PathName;
    return newAttachment;
  }

  public lectureModelConverter(lecture: any): Lecture {
    const newLecture = new Lecture();
    newLecture.id = lecture.LecturesId;
    newLecture.attachments = lecture.Attachments.map(attachment => this.attachmentModelConverter(attachment));
    newLecture.duration = lecture.Duration;
    newLecture.order = lecture.Order;
    newLecture.pathFile = lecture.PathFile;
    newLecture.subjectId = lecture.SubjectId;
    newLecture.theme = lecture.Theme;
    return newLecture;
  }

  public lecturesModelConverter(lectures: any[]): Lecture[] {
    return lectures.map(lecture => this.lectureModelConverter(lecture));
  }

  public calendarModelConverter(calendar: any): Calendar {
    const newCalendar = new Calendar();
    newCalendar.id = calendar.Id;
    newCalendar.date = calendar.Date;
    newCalendar.subjectId = calendar.SubjectId;
    return newCalendar;
  }

  public calendarModelsConverter(calendar: any[]): Calendar[] {
    return calendar.map(res => this.calendarModelConverter(res));
  }

  public groupModelConverter(group: any): Group {
    const newGroup = new Group();
    newGroup.countUnconfirmedStudents = group.CountUnconfirmedStudents;
    newGroup.groupId = group.GroupId;
    newGroup.groupName = group.GroupName;
    newGroup.lecturesMarkVisiting = group.LecturesMarkVisiting;
    newGroup.scheduleProtectionPracticals = group.ScheduleProtectionPracticals;
    newGroup.students = group.Students;
    newGroup.subGroupsOne = this.subGroupConverter(group.SubGroupsOne);
    newGroup.subGroupsThird = this.subGroupConverter(group.SubGroupsThird);
    newGroup.subGroupsTwo = this.subGroupConverter(group.SubGroupsTwo);
    return newGroup;
  }

  public groupsModelConverter(groups: any[]): Group[] {
    return groups.map(res => this.groupModelConverter(res));
  }

  private subGroupConverter(subGroup: any) {
    const newSubGroup = new SubGroup();
    newSubGroup.groupId = subGroup.GroupId;
    newSubGroup.labs = subGroup.Labs;
    newSubGroup.name = subGroup.Name;
    newSubGroup.scheduleProtectionLabs = subGroup.ScheduleProtectionLabs;
    newSubGroup.scheduleProtectionLabsRecomendMark = subGroup.ScheduleProtectionLabsRecomendMark;
    newSubGroup.students = subGroup.Students;
    newSubGroup.subGroupId = subGroup.SubGroupId;
    return newSubGroup;
  }

  public groupVisitingConverter(groupVisiting: any) {
    const newGroupVisiting = new GroupsVisiting();
    newGroupVisiting.groupId = groupVisiting.GroupId;
    newGroupVisiting.lecturesMarksVisiting = groupVisiting.LecturesMarksVisiting.map(res => this.lecturesMarksVisitingConverter(res));
    return newGroupVisiting;
  }

  public groupsVisitingConverter(groupsVisiting: any[]) {
    return groupsVisiting.map(res => this.groupVisitingConverter(res));
  }

  private lecturesMarksVisitingConverter(lecturesMarksVisiting: any) {
    let newLecturesMarksVisiting = new LecturesMarksVisiting();
    newLecturesMarksVisiting = lecturesMarksVisiting;
    // newLecturesMarksVisiting.login = lecturesMarksVisiting.Login;
    // newLecturesMarksVisiting.studentId = lecturesMarksVisiting.StudentId;
    // newLecturesMarksVisiting.studentName = lecturesMarksVisiting.StudentName;
    // newLecturesMarksVisiting.marks = this.marksModelConverter(lecturesMarksVisiting.Marks);
    return newLecturesMarksVisiting;
  }

  public markModelConverter(mark: any) {
    const newMark = new Mark();
    // newMark. = mark.Date;
    newMark.LecturesVisitId = mark.LecuresVisitId;
    newMark.Mark = mark.Mark;
    newMark.MarkId = mark.MarkId;
    return newMark;
  }

  public marksModelConverter(marks: any[]) {
    return marks.map(res => this.markModelConverter(res));
  }

  public scheduleProtectionLabsRecomendConverter(schedule: any) {
    const newSchedule = new ScheduleProtectionLabsRecomend();
    newSchedule.mark = schedule.Mark;
    newSchedule.scheduleProtectionId = schedule.ScheduleProtectionId;
    return newSchedule;
  }

  private labWorkConverter(lab: any) {
    const newLab = new Lab();
    newLab.duration = lab.Duration;
    newLab.labId = lab.LabId;
    newLab.order = lab.Order;
    newLab.pathFile = lab.PathFile;
    newLab.attachments = lab.Attachments ? lab.Attachments.map(res => this.attachmentModelConverter(res)) : lab.Attachments;
    newLab.scheduleProtectionLabsRecomend = lab.ScheduleProtectionLabsRecomend ?
      lab.ScheduleProtectionLabsRecomend.map(res => this.scheduleProtectionLabsRecomendConverter(res)) : lab.ScheduleProtectionLabsRecomend;
    newLab.shortName = lab.ShortName;
    newLab.subGroup = lab.SubGroup;
    newLab.subjectId = lab.SubjectId;
    newLab.theme = lab.Theme;
    return newLab;
  }

  public labsWorkConverter(labs: any[]) {
    return labs.map(res => this.labWorkConverter(res));
  }

  private scheduleProtectionLabConverter(schedule: any) {
    const newSchedule = new ScheduleProtectionLab();
    newSchedule.id = schedule.ScheduleProtectionLabId;
    newSchedule.date = schedule.Date;
    newSchedule.subGroup = schedule.SubGroup;
    newSchedule.subGroupId = schedule.SubGroupId;
    return newSchedule;
  }

  public scheduleProtectionLabsConverter(schedules: any[]) {
    return schedules.map(res => this.scheduleProtectionLabConverter(res));
  }

  public labUpdateConverter(lab: Lab): UpdateLab {
    const updateLab = new UpdateLab();
    updateLab.Id = +lab.labId;
    updateLab.ShortName = lab.shortName;
    updateLab.PathFile = lab.pathFile;
    updateLab.Attachments = JSON.stringify(lab.attachments);
    updateLab.Duration = lab.duration;
    updateLab.Theme = lab.theme;
    updateLab.Order = lab.order;
    updateLab.SubjectId = lab.subjectId;
    return updateLab;
  }

  public labsUpdateConverter(labs: Lab[]): UpdateLab[] {
    return labs.map(l => this.labUpdateConverter(l));
  }

  public labToCreateEntity(lab: Lab): CreateEntity {
    const entity = new CreateEntity();
    entity.attachments = JSON.stringify(lab.attachments);
    entity.duration = lab.duration;
    entity.id = +lab.labId;
    entity.subjectId = lab.subjectId;
    entity.shortName = lab.shortName;
    entity.theme = lab.theme;
    entity.pathFile = lab.pathFile;
    entity.order = lab.order;
    return entity;
  }

  public practicalToCreateEntity(practical: Practical): UpdateLab {
    const entity = new UpdateLab();
    entity.Attachments = JSON.stringify(practical.Attachments);
    entity.Duration = practical.Duration;
    entity.Id = practical.PracticalId;
    entity.SubjectId = practical.SubjectId;
    entity.ShortName = practical.ShortName;
    entity.Theme = practical.Theme;
    entity.PathFile = practical.PathFile;
    entity.Order = practical.Order;
    return entity;
  }

  public practicalsUpdateConverter(labs: Practical[]): UpdateLab[] {
    return labs.map(p => this.practicalToCreateEntity(p));
  }
}
