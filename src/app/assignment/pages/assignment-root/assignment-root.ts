import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-assignment-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './assignment-root.html',
  styleUrl: './assignment-root.scss',
})
export class AssignmentRoot {}
