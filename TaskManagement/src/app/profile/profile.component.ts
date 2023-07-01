import { Component } from '@angular/core';
import { faUser, faEnvelope, faLock, faEye ,faEyeSlash,faCamera} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../service/profile/user-profile.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  firstName:string;
  lastName:string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string; 
  isEditMode: boolean = false; // Track edit mode



  faUser = faUser;
  faEnvelope = faEnvelope;
  faCamera=faCamera;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  passwordVisibility = false;
  confirmPasswordVisibility = false;

  constructor(private route :ActivatedRoute,private userService:UserProfileService){
    
  }
  

  ngOnInit() {
    // Load and display user details from storage or API
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.userService.getUserDetails().subscribe(
      (userDetails) => {
        this.firstName=userDetails.firstName;
        this.lastName=userDetails.lastName;
        this.username = userDetails.username;
        this.email = userDetails.email;
        this.password = userDetails.password;
        this.confirmPassword = userDetails.password;
      },
      (error) => {
        console.error('Failed to load user details:', error);
      }
    );
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

  saveChanges() {
    
    // Update the user details in storage or API

    // Exit edit mode
    this.toggleEditMode();

    // Show alert box with success message
    Swal.fire({
      title: 'Do you want to save the changes?',
      width:350,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
      customClass: {
        popup: 'small-alert-popup',
        title: 'small-alert-title',
        htmlContainer: 'small-alert-html-container',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved successfully!', '', 'success');
        console.log('Changes saved!');
        console.log('firstname:', this.firstName);
        console.log('lastname:', this.lastName);
        console.log('Username:', this.username);
        console.log('Email:', this.email);
        console.log('Password:', this.password);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
        console.log('o changes');
      }
    });
    
    
  }




  url = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";
  
  selectedImage: string;


  onSelect(event) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.selectedImage = event.target.result;
      };
      this.isEditMode = true;
    } else {
      window.alert('Please select a valid image format.');
    }
  }
  

  saveImage() {
    // Logic to save the image, e.g., send it to the server
    if (this.selectedImage) {
      this.url = this.selectedImage;
    }
    this.isEditMode = false;
  }
  






}








