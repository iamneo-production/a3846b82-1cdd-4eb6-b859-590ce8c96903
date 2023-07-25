import { Component } from '@angular/core';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash, faCamera ,faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { UserProfileService } from '../service/profile/user-profile.service';
import { UserAuthService } from '../service/service/user-auth.service';
import { User } from '../user-details/user-details.component'; 
import { UserserviceService } from '../service/data/userservice.service'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  confirmPassword: string;
  imagePath: File;
  isEditMode: boolean = false;

  faUser = faUser;
  faEnvelope = faEnvelope;
  faCamera = faCamera;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faTrashAlt=faTrashAlt;
  passwordVisibility = false;
  confirmPasswordVisibility = false;
  userId: string;

  user: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient, private UserProfileService:UserProfileService, private userAuthService: UserAuthService,private Userservice:UserserviceService) {}

  ngOnInit() {
    this.loadUserDetails();
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    this.passwordVisibility = false;
    this.confirmPasswordVisibility = false;
  }

  togglePasswordVisibility() {
    this.passwordVisibility = !this.passwordVisibility;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisibility = !this.confirmPasswordVisibility;
  }
  
  
  

  getUserImageUrl() {
    if (this.imagePath) {
      return URL.createObjectURL(this.imagePath);
    } else if (this.user.image) {
      return this.user.image;
    } else {
      return 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg';
    }
  }

  onSelect(event) {
    let fileType = event.target.files[0].type;
    this.isEditMode = true;
    if (fileType.match(/image\/*/)) {
      this.imagePath = event.target.files[0];
      this.isEditMode = true;
    } else {
      Swal.fire('Please select a valid image format', '', 'error');
    }
  }

  saveChanges() {
    this.toggleEditMode();

    Swal.fire({
      title: 'Do you want to save the changes?',
      width: 350,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
      customClass: {
        popup: 'small-alert-popup',
        title: 'small-alert-title',
        htmlContainer: 'small-alert-html-container',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.sendPutRequest();
        console.log(this.user);
        setTimeout(() => {
          location.reload(); // Refresh the browser after a delay
        }, 2000);
        
      } else if (result.isDenied) {
        this.isEditMode = false;
        console.log('No changes');
        Swal.fire('Changes not saved!', '', 'error');
      }
    });
  }

  

  removeImage(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will remove the current image.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const userId = this.user.id; // Assuming you have the user's ID available
        const url = `https://8080-ebfbfabcfcfdedeaeaadbdbabf.project.examly.io/delete/${userId}/image`; // Update the URL with the backend endpoint
  
        // Send the DELETE request
        axios.delete(url)
          .then(response => {
            // Image deleted successfully
            this.user.image = null;
            this.imagePath = null;
  
            // Save the changes by making another API request or updating the necessary data
            //this.saveChanges(); // Call your saveChanges method or update the necessary data
          })
          .catch(error => {
            // Handle error
            console.error(error);
          });
      }
    });
  }

  loadUserDetails() {
    const id = this.userAuthService.getUserId();
    if (id) {
      this.Userservice.retrieveUserById(id).subscribe({
        next: (response) => {
          this.user = response;
          this.loadUserImage(); // Load the user image
        },
        error: (error) => {
          console.error('Error fetching user details:', error);
        }
      });
    } else {
      console.error('User ID not found in local storage.');
    }
  }

  loadUserImage() {
    this.UserProfileService.getUserImage(this.user.id).subscribe({
      next: (imageBlob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.user.image = reader.result; // Assuming the user object has an 'image' property to store the image data
        };
        reader.readAsDataURL(imageBlob);
      },
      error: (error) => {
        console.error('Error fetching user image:', error);
      }
    });
  }

  /*removeImage(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will remove the current image.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUserImage(this.user.id).subscribe({
          next: () => {
            // Image deleted successfully
            this.user.image = null;
            this.imagePath = null;
            this.loadUserDetails(); 
            // Save the changes by calling the saveChanges method or updating the necessary data
            // this.saveChanges(); // Call your saveChanges method or update the necessary data
          },
          error: (error) => {
            // Handle error
            console.error(error);
          }
        });
      }
    });
  }*/
  
  sendPutRequest() {
    const formData = new FormData();
    formData.append('file', this.imagePath);
  
    formData.append('firstname', this.user.firstname);
    formData.append('lastname', this.user.lastname);
    formData.append('username', this.user.username);
    formData.append('email', this.user.email);
    formData.append('password', this.user.password);
  
    this.Userservice.updateUser('userId', formData).subscribe({
      next: (response) => {
        console.log('User details updated successfully');
        Swal.fire('Saved successfully!', '', 'success');
        
      },
      error: (error) => {
        console.error('Error updating user details:', error);
      },
    });
  }
        
  
}
