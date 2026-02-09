// Type definition for value objects
export type ValueObject<T> = { value: T };

export interface Profile {
  readonly studentId: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly age: number;
  readonly autobiography: string;
  readonly friends: readonly string[];
}

export type ProfileModel = Omit<Profile, 'friends'> & {
  readonly friends: readonly ValueObject<Profile['friends'][number]>[];
};
