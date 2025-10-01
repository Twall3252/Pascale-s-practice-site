import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ReleaseInfo {
  name: string;
  tag: string;
  url: string;
  published: string;
}

export interface RepoRef {
  owner: string;
  repo: string;
}

const DEFAULT_REPOS: RepoRef[] = [
  { owner: 'flipperdevices', repo: 'flipperzero-firmware' },
  { owner: 'RogueMaster', repo: 'FlipperZeroFirmware-RogueMaster' },
  { owner: 'DarkFlippers', repo: 'Unleashed-Firmware' },
  { owner: 'Memento', repo: 'Momentum-FlipperZero' },
  { owner: 'justcallmekoko', repo: 'Marauder-Firmware' }
];

async function listDocs(collection: string): Promise<any[]> {
  const json = await AsyncStorage.getItem(collection);
  if (!json) return [];
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
}

async function insertDoc(collection: string, doc: any) {
  const existing = await listDocs(collection);
  existing.push(doc);
  await AsyncStorage.setItem(collection, JSON.stringify(existing));
}

export function listUserRepos(): Promise<RepoRef[]> {
  return listDocs('repos').then((docs) => (docs || []) as RepoRef[]);
}

export function addUserRepo(owner: string, repo: string) {
  return insertDoc('repos', { owner, repo } as RepoRef);
}

export function fetchFirmwareReleases(): Promise<ReleaseInfo[]> {
  return listUserRepos()
    .then((userRepos) => {
      const map: Record<string, RepoRef> = {};
      [...DEFAULT_REPOS, ...userRepos].forEach((r) => {
        map[`${r.owner}/${r.repo}`] = r;
      });
      const all: RepoRef[] = Object.values(map);

      const requests = all.map((r) =>
        fetch(`https://api.github.com/repos/${r.owner}/${r.repo}/releases?per_page=1`)
          .then((res) => res.json())
          .then((json) => {
            if (!Array.isArray(json) || json.length === 0) return null;
            const latest = json[0];
            return {
              name: r.repo,
              tag: latest.tag_name || latest.name,
              url: latest.html_url,
              published: latest.published_at || ''
            } as ReleaseInfo;
          })
          .catch(() => null)
      );
      return Promise.all(requests).then((arr) => arr.filter(Boolean) as ReleaseInfo[]);
    })
    .catch(() => Promise.resolve([]));
}
