import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GoogleDriveService, IResp2} from '../../service/google-drive.service';

@Component({
  selector: 'app-google-drive',
  templateUrl: './google-drive.component.html',
  styleUrls: ['./google-drive.component.scss']
})
export class GoogleDriveComponent implements OnInit {
  sum = 0;
  files: IResp2[] = [];
  tableRows: IResp3[] = [];
  loaderWrapperVisibility = true;

  constructor(private route: ActivatedRoute, private router: Router, private drive: GoogleDriveService) {
  }

  ngOnInit(): void {
  }

  getDataFromGoogleDrive(): void {
// @ts-ignore
    const fragment: string = this.route.fragment.value;
    let accessToken = sessionStorage.getItem('access_token');
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
          this.tableRows.push(new IResp3(file.owners, file.size, 1));
          this.sum += parseFloat((file.size / 1000).toFixed(2));
        }
      }, error => console.log(error),
      () => this.loaderWrapperVisibility = false);
    this.tableRows.forEach(f => {
      alert('sidbfdkfasf');
    });
    // @ts-ignore
    for (let i = 0; i < this.tableRows - 1; i++) {
      // @ts-ignore
      for (let j = 1; j < this.tableRows - 2; j++) {

        // if (j() === i[0]) {
        // }
      }
    }
    console.log(this.tableRows);
  }

  logout(): void {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/main']);
  }
}


class IResp3 {
  public userAddress: string;
  public size: number;
  public fileCount: number;

  constructor(userAddress: string, size: number, fileCount: number) {
    this.userAddress = userAddress;
    this.size = size;
    this.fileCount = fileCount;
  }
}
