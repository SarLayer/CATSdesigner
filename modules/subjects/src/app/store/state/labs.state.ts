import { HasJobProtection } from './../../models/has-job-protection.model';
import { StudentMark } from 'src/app/models/student-mark.model';
import { UserLabFile } from 'src/app/models/user-lab-file.model';
import { Lab, ScheduleProtectionLabs } from '../../models/lab.model';

export interface ILabsState {
  labs: Lab[];
  schedule: ScheduleProtectionLabs[];
  students: StudentMark[];
  studentsLabsFiles: StudentMark[],
  userLabsFiles: UserLabFile[];
  hasJobProtections: HasJobProtection[]
}

export const initialLabsState: ILabsState = {
  labs: [],
  schedule: [],
  students: [],
  studentsLabsFiles: [],
  userLabsFiles: [],
  hasJobProtections: []
};
