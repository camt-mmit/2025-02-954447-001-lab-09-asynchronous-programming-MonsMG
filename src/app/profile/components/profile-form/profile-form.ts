import { DecimalPipe } from '@angular/common';
import { Component, model, ChangeDetectionStrategy } from '@angular/core';
import {
  FormField,
  apply,
  applyEach,
  createManagedMetadataKey,
  createMetadataKey,
  form,
  metadata,
} from '@angular/forms/signals';
import { Profile } from '../../types';
import { createFriend } from '../../helpers';
@Component({
  selector: 'app-profile-form',
  imports: [FormField, DecimalPipe],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileForm {
  readonly data = model.required<Profile>();
  protected readonly friendsCountKey = createMetadataKey<number>();
  protected readonly friendUcNameKey = createMetadataKey<string>();

  protected readonly form = form(this.data, (path) => {
    metadata(path.friends, this.friendsCountKey, ({ value }) => value().length);

    applyEach(path.friends, (path) => {
      metadata(path, this.friendUcNameKey, ({ value }) => {
        return value()?.toUpperCase()??'';
      });
    });
  });

  protected addFriend(): void {
    this.form.friends().value.update((items) => [...items, createFriend()]);
  }

  protected removeFriend(index: number): void {
    this.form.friends().value.update((items) => items.filter((_item, i) => i !== index));
  }

  protected moveFriend(index: number, offset: number): void {
    this.form
      .friends()
      .value.update((items) =>
        items.map((item, i) =>
          i === index ? items[index + offset] : i === index + offset ? items[index] : item,
        ),
      );
  }
}
