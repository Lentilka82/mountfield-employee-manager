import { Country } from './country';
import { Gender } from './gender';
import { JobCategory } from './jobcategry';

export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: Gender;
  jobCategory: JobCategory;
  email: string;
  phoneNumber: number;
  country: Country;
  joinDate: Date;
}
