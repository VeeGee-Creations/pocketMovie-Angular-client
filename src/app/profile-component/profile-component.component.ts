import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.component.html',
  styleUrls: ['./profile-component.component.scss']
})
export class ProfileComponentComponent implements OnInit {

  // holds profile input data
  profile: any = {};
  edit: boolean = false
  
  @Input() profileData = { Username: '', Email: '', Birthday: '', Password: ''};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<ProfileComponentComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  // retrieves user profile from api
  getProfile(): void {
    this.fetchApiData.getProfile().subscribe((response: any) => {
      const prepData = {
        Username: response.Username,
        Email: response.Email,
        Birthdate: new Date(response.Birthday).toLocaleDateString('en-CA'),
        Birthday: new Date(response.Birthday).toDateString()
      }
      this.profile = prepData;
      return this.profile;
    });
  }

  editToggle() {
    if(this.edit) return this.edit = false;
    this.profileData.Username = this.profile.Username;
    this.profileData.Email = this.profile.Email;
    this.profileData.Birthday = this.profile.Birthdate;
    return this.edit = true;
  }

  updateProfile(): void {
    this.fetchApiData.editProfile(this.profileData).subscribe((result: any) => {
      this.snackBar.open('Update Submited', 'OK', {
        duration: 2000
      });
      this.snackBar.open('Update Sucessful', 'OK', {
        duration: 2000
      });
      localStorage.setItem('user', result.Username);
      console.log(result);this.snackBar.open(result, 'OK', {
        duration: 2000
      });
      this.editToggle();
    }, (result: any) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
