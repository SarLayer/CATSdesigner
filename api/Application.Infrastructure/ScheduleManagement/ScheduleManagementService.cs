﻿using Application.Core;
using Application.Core.Data;
using Application.Infrastructure.Models;
using Application.Infrastructure.SubjectManagement;
using LMPlatform.Data.Repositories;
using LMPlatform.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Infrastructure.ScheduleManagement
{
	public class ScheduleManagementService : IScheduleManagementService
	{

		private readonly LazyDependency<ISubjectManagementService> _subjectManagementService = new LazyDependency<ISubjectManagementService>();

		public ISubjectManagementService SubjectManagementService => _subjectManagementService.Value;

		public bool CheckIfAllowed(DateTime date, TimeSpan startTime, TimeSpan endTime, string building, string audience)
		{
			using (var repositoriesContainer = new LmPlatformRepositoriesContainer())
			{
				var lecturesSchedule = repositoriesContainer.RepositoryFor<LecturesScheduleVisiting>().GetAll(new Query<LecturesScheduleVisiting>(x => x.Date == date))
					.ToList()
					.Select(x => LectureScheduleToModel(x));

				var labsSchedule = repositoriesContainer.RepositoryFor<ScheduleProtectionLabs>().GetAll(new Query<ScheduleProtectionLabs>(x => x.Date == date))
					.ToList()
					.Select(x => LabScheduleToModel(x));

				return !lecturesSchedule.Concat(labsSchedule).Any(x =>
					((x.Start <= startTime && x.End >= endTime) ||
					(x.Start <= startTime && x.End <= endTime && startTime <= x.End) ||
					(x.Start >= startTime && endTime >= x.Start && endTime <= x.End) ||
					(x.Start >= startTime && x.Start <= endTime && startTime <= x.End && x.End <= endTime))
					&& x.Audience.Trim().ToLower() == audience.Trim().ToLower());
			}
		}

		public IEnumerable<ScheduleModel> GetScheduleBetweenDates(DateTime startDate, DateTime endDate)
		{
			using (var repositoriesContainer = new LmPlatformRepositoriesContainer())
			{
				var lecturesSchedule = repositoriesContainer.RepositoryFor<LecturesScheduleVisiting>().GetAll(new Query<LecturesScheduleVisiting>(x => x.Date >= startDate && x.Date <= endDate)
					.Include(x => x.Subject.SubjectLecturers.Select(x => x.Lecturer))
					.Include(x => x.Subject.Notes))
					.ToList()
					.Select(x => LectureScheduleToModel(x));

				var labsSchedule = repositoriesContainer.RepositoryFor<ScheduleProtectionLabs>().GetAll(new Query<ScheduleProtectionLabs>(x => x.Date >= startDate && x.Date <= endDate)
					.Include(x => x.Subject.SubjectLecturers.Select(x => x.Lecturer))
					.Include(x => x.Subject.Notes))
					.ToList()
					.Select(x => LabScheduleToModel(x));

				return lecturesSchedule.Concat(labsSchedule);
			}
		}

		public IEnumerable<ScheduleModel> GetScheduleForDate(DateTime date)
		{
			using (var repositoriesContainer = new LmPlatformRepositoriesContainer())
			{
				var lecturesSchedule = repositoriesContainer.RepositoryFor<LecturesScheduleVisiting>().GetAll(new Query<LecturesScheduleVisiting>(x => x.Date == date)
					.Include(x => x.Subject.SubjectLecturers.Select(x => x.Lecturer))
					.Include(x => x.Subject.Notes))
					.ToList()
					.Select(x => LectureScheduleToModel(x));

				var labsSchedule = repositoriesContainer.RepositoryFor<ScheduleProtectionLabs>().GetAll(new Query<ScheduleProtectionLabs>(x => x.Date == date)
					.Include(x => x.Subject.SubjectLecturers.Select(x => x.Lecturer))
					.Include(x => x.Subject.Notes))
					.ToList()
					.Select(x => LabScheduleToModel(x));

				return lecturesSchedule.Concat(labsSchedule);
			}



		}

		public void SaveDateLectures(int subjectId, DateTime date, TimeSpan startTime, TimeSpan endTime, string building, string audience)
		{
			using (var repositoriesContainer = new LmPlatformRepositoriesContainer()) {
				repositoriesContainer.RepositoryFor<LecturesScheduleVisiting>().Save(new LecturesScheduleVisiting
				{
					Date = date,
					SubjectId = subjectId,
					Audience = audience,
					Building = building,
					EndTime = endTime,
					StartTime = startTime
				});
				repositoriesContainer.ApplyChanges();
			}

		}

		public void SaveScheduleProtectionLabsDate(int subjectId, int subGroupId, DateTime date, TimeSpan startTime, TimeSpan endTime, string building, string audience)
		{
			using (var repositoriesContainer = new LmPlatformRepositoriesContainer())
			{
				repositoriesContainer.RepositoryFor<ScheduleProtectionLabs>().Save(new ScheduleProtectionLabs
				{
					SubjectId = subjectId,
					SuGroupId = subGroupId,
					Date = date,
					StartTime = startTime,
					EndTime = endTime,
					Audience = audience,
					Building = building
				});
				repositoriesContainer.ApplyChanges();
			}

		}

		private ScheduleModel LectureScheduleToModel(LecturesScheduleVisiting lecturesSchedule)
		{
			return new ScheduleModel
			{
				Audience = lecturesSchedule.Audience,
				Building = lecturesSchedule.Building,
				Color = lecturesSchedule.Subject?.Color ?? string.Empty,
				End = lecturesSchedule.EndTime,
				Start = lecturesSchedule.StartTime,
				Name = lecturesSchedule.Subject?.Name ?? string.Empty,
				ShortName = lecturesSchedule.Subject?.Color ?? string.Empty,
				Teachers = lecturesSchedule.Subject?.SubjectLecturers ?? Enumerable.Empty<SubjectLecturer>(),
				SubjectId = lecturesSchedule.SubjectId,
				Type = ClassType.Lecture,
				Date = lecturesSchedule.Date,
				Id = lecturesSchedule.Id
			};
		}

		private ScheduleModel LabScheduleToModel(ScheduleProtectionLabs labSchedule)
		{
			return new ScheduleModel
			{
				Audience = labSchedule.Audience,
				Building = labSchedule.Building,
				Color = labSchedule.Subject?.Color ?? string.Empty,
				End = labSchedule.EndTime,
				Start = labSchedule.StartTime,
				Name = labSchedule.Subject?.Name ?? string.Empty,
				ShortName = labSchedule.Subject?.Color ?? string.Empty,
				Teachers = labSchedule.Subject?.SubjectLecturers ?? Enumerable.Empty<SubjectLecturer>(),
				SubjectId = labSchedule.SubjectId,
				Type = ClassType.Lab,
				Date = labSchedule.Date,
				Id = labSchedule.Id
			};
		}

		public IEnumerable<ScheduleModel> GetUserSchedule(int userId, DateTime startDate, DateTime endDate)
		{
			var scedule = GetScheduleBetweenDates(startDate, endDate);
			var subjects = SubjectManagementService.GetUserSubjects(userId);
			return scedule.Where(day => subjects.Any(subject => day.SubjectId == subject.Id));
		}

		public IEnumerable<ScheduleModel> GetScheduleBetweenTimes(DateTime date, TimeSpan startTime, TimeSpan endTime)
		{
			using (var repositoriesContainer = new LmPlatformRepositoriesContainer())
			{
				var lecturesSchedule = repositoriesContainer.RepositoryFor<LecturesScheduleVisiting>().GetAll(new Query<LecturesScheduleVisiting>(x => x.Date == date && x.StartTime >= startTime && x.EndTime <= endTime)
					.Include(x => x.Subject.SubjectLecturers.Select(x => x.Lecturer))
					.Include(x => x.Subject.Notes))
					.ToList()
					.Select(x => LectureScheduleToModel(x));

				var labsSchedule = repositoriesContainer.RepositoryFor<ScheduleProtectionLabs>().GetAll(new Query<ScheduleProtectionLabs>(x => x.Date == date && x.StartTime >= startTime && x.EndTime <= endTime)
					.Include(x => x.Subject.SubjectLecturers.Select(x => x.Lecturer))
					.Include(x => x.Subject.Notes))
					.ToList()
					.Select(x => LabScheduleToModel(x));

				return lecturesSchedule.Concat(labsSchedule);
			}
		}
    }
}
