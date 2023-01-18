import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-treballadors',
  templateUrl: './admin-treballadors.component.html',
  styleUrls: ['./admin-treballadors.component.css']
})
export class AdminTreballadorsComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.selectTreballador();
    this.btnsActions();
  }
  selectTreballador(){
    let treballadors =  document.querySelectorAll('.treballador');
    treballadors?.forEach(li => li.addEventListener('click', () => {
      this.removeSelecions(treballadors);
      li.classList.add('active');

      this.actionsWithTreballador();
    }))
  }
  removeSelecions(treballadors:NodeListOf<Element>){
    treballadors.forEach(t => t.classList.remove('active'));
  }
  actionsWithTreballador(){
    document.querySelector('.btns')?.classList.add('active');
  }

  btnsActions(){
    document.querySelector('.btn_secondary')?.addEventListener('click', () => {
      document.querySelector('.btns')?.classList.remove('active');
      this.removeSelecions(document.querySelectorAll('.treballador'));
    });
  }
  /* NAVEGACIO */
  goToAdmin(){
    this.router.navigate(['/admin']);
  }

}
