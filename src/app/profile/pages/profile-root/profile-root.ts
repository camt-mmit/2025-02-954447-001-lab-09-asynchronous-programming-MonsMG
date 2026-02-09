import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile-root',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './profile-root.html',
  styleUrl: './profile-root.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileRoot {}
