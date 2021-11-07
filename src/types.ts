export interface Version {
  id: string;
  streamId: string;
  tag?: string;
}

export interface CrateItem {
  id: number;
  track: string;
  artist: string;
  genre: string;
  bpm: string;
  year: string;
  versions: Version[];
}

export interface DbItem {
  id: number;
  versions: number[];
  status: 'reviewed' | 'queue' | 'downloaded';
}

export type FilterCategory = 'reviewed' | 'queue' | 'downloaded' | 'to-review';

export interface AudioPlayerTrack {
  id: CrateItem['id'];
  version: Version | undefined;
}

export type OnTrackChangeHandler = (e: React.MouseEvent, track: AudioPlayerTrack) => void;