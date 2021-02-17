import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GoogleDriveService, IResp2} from '../../service/google-drive.service';

@Component({
  selector: 'app-google-drive',
  templateUrl: './google-drive.component.html',
  styleUrls: ['./google-drive.component.scss']
})
export class GoogleDriveComponent implements OnInit {
  sum  = 0;
  files: IResp2[] = [];
  okToken = sessionStorage.getItem('access_token');
  tableRows: { userAddress: string; fileCount: number; size: number }[] = [];
  loaderWrapperVisibility = true;

  constructor(private route: ActivatedRoute, private router: Router, private drive: GoogleDriveService) {
  }

  ngOnInit(): void {
  }

  getDataFromGoogleDrive(): void {
// @ts-ignore
    const fragment: string = this.route.fragment.value;
    let accessToken = sessionStorage.getItem('access_token');
    // console.log(fragment);
    if (fragment != null) {
      try {
        // @ts-ignore
        accessToken = fragment.split('&').find(value => {
          return value.startsWith('access_token');
        }).split('=')[1];
        sessionStorage.setItem('access_token', accessToken);
      } catch (error) {
        this.router.navigateByUrl('/');
        return;
      }
    }
    this.drive.getAllFiles().subscribe(file => {
        if (typeof file.size === 'string') {
          file.size = parseFloat((file.size / (1000 * 1000)).toFixed(4));
          // @ts-ignore
          file.owners = file.owners[0].emailAddress;
          this.files.push(file);
          this.sum += parseFloat((file.size / 1000).toFixed(2));
          // this.sum = parseFloat((this.sum / 1000).toFixed(2));
        }
      }, error => console.log(error),
      () => this.loaderWrapperVisibility = false);

    /*todo: stop multiplying the sum 😛*/

    this.getOwners();
  }

  private getOwners(): void {
    this.files.forEach(f => {
      console.log(f);
      // let num = true;
      // this.tableRows.forEach(x => {
      //   if ((x.ownerAddress === f.tableRows[0].emailAddress)) {
      //     !num;
      //   }
      //   if (num) {
      //     this.owners.push(f);
      //   }
      // });
    });
  }

  logout(): void {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/main']);
  }
}
