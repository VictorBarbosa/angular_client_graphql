import { Component } from '@angular/core';
import { FamilyModel } from 'src/models/Family';
import { GraphServicesService } from './services/graph-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedValue: string = '';
  picture: string = '';
  body: string = ``;
  families: Array<FamilyModel> = new Array<FamilyModel>();
  members: Array<FamilyModel> = new Array<FamilyModel>();
  familyName: string = '';
  memberName: string = '';
  divModalShow: boolean = true;
  constructor(private service: GraphServicesService) {
    this.service.Query('allFamilies{name photo}').subscribe((x: any) => {
      this.families = x.data.allFamilies;

      this.divModalShow = false;
    });
  }

  SelectedMember(member: FamilyModel) {
    this.picture = member.photo;
    this.memberName = member.name;
  }
  SelectedFamily(familySelected: FamilyModel) {
    this.memberName="";
    this.divModalShow = true;
    this.picture = familySelected.photo;
    this.familyName = familySelected.name;
    this.members = null;
    const query = `family(name:"${
      familySelected.name
    }"){  name     members{      name       photo     }}`;
    this.service.Query(query).subscribe((x: any) => {
      this.members = x.data.family.members;
      this.divModalShow = false;
    });
  }
}
