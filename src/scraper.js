// set to 0 for first time scrape
const lastIdFetched = 43125;
const scrapeTillPage = 3;

// using `scrapeTillPage` is more reliable, since there can be multiple updates on one day that might overlap 2 pages
const lastFetchedDate = '2021-10-10T22:00:00.000Z';

// @ts-nocheck
function scrapePage() {
  const nextLink = document.querySelector('.nextpostslink');
  const pageNr = document.location.href
    .replace(/https:\/\/(www\.)?beatjunkies\.com\/record-pool\//g, '')
    .replace('page/', '')
    .replace('/', '');

  // reset localStorage
  if (pageNr === '' || Number(pageNr) === 1) {
    var confirm = window.confirm('Reset crate');

    if (confirm === true) {
      window.localStorage.removeItem('tracks');
      console.log('localStorage reset');
    }
  }

  console.log(`Scraping page ${pageNr}`);
  const prevTracks = JSON.parse(window.localStorage.getItem('tracks')) || [];
  const newTracks = getTrackInfo().filter(item =>
    filterPrevDownloadedTracks(item, lastFetchedDate),
  );
  const mergedTracks = prevTracks.concat(newTracks);
  window.localStorage.setItem('tracks', JSON.stringify(mergedTracks));

  const dateRows = Array.from(
    document.querySelectorAll('#record-pool-table tbody tr:not([class])'),
  );
  const dates = dateRows.map(row => new Date(row.textContent.trim()).getTime());
  const hasReachedLastFetchedDate = !!dates.find(
    date => date < new Date(lastFetchedDate).getTime(),
  );

  const isOnLastPage =
    Number(pageNr) === Number(scrapeTillPage) ||
    hasReachedLastFetchedDate ||
    !nextLink;
  if (isOnLastPage) return onFinish(mergedTracks);
  nextLink.click();
}

scrapePage();

function onFinish(data) {
  const lastFetchedDate = data[0].dateAdded;
  // reverse tracks + add id's
  const finalizedData = data
    .reverse()
    .map((item, index) => ({ ...item, id: lastIdFetched + index + 1 }));
  saveAs(
    new Blob(
      [
        JSON.stringify({
          lastFetchedDate: [lastFetchedDate],
          tracks: finalizedData,
        }),
      ],
      {
        type: 'application/json',
      },
    ),
    'crate.json',
  );
  console.log('✅ SCRAPING FINISHED!');
}

/**
 * Invokes a save dialog for a Blob or an Url object or strings target.
 * @param  {Blob|Url|string}  content  The Blob or url to save.
 * @param  {string}           name     The suggested file name.
 */
function saveAs(content, name) {
  const isBlob = typeof content.type === 'string';

  const link = Object.assign(window.document.createElement('a'), {
    download: name,
    target: '_blank', // fallback
    href: isBlob ? window.URL.createObjectURL(content) : content,
  });
  clickElement.call(window, link);
  isBlob &&
    window.setTimeout(function () {
      window.URL.revokeObjectURL(link.href);
    }, 1000);
}

function getTrackInfo(el) {
  var info = Array.from(document.querySelectorAll('tr.song-id')).map(
    tableRow => {
      const track = tableRow.querySelector('.title-table').textContent.trim();
      const artist = tableRow
        .querySelector('.subtitle-table')
        .textContent.trim();
      const genre = tableRow
        .querySelector('td:nth-child(2)')
        .textContent.trim();
      const bpm = tableRow.querySelector('td:nth-child(3)').textContent.trim();
      const year = tableRow.querySelector('td:nth-child(4)').textContent.trim();
      const songList =
        tableRow.nextElementSibling.querySelectorAll('a[id^="song-"]');
      const versions = Array.from(songList)?.map(version => {
        const tag = version.dataset.tag.trim();
        // /stream?idattachment=425588&nocopy=425587.mp3
        const noCopyRegex = /(?=nocopy=(\d*))/gm;
        const streamId = noCopyRegex.exec(version.href).filter(Boolean)?.[0];
        return {
          tag: tag ? tag : undefined,
          id: version.id.replaceAll('song-', ''),
          streamId,
        };
      });

      const dateAdded = new Date(
        getPreviousSibling(tableRow, 'tr:not([class])').textContent.trim(),
      );

      return {
        dateAdded,
        track,
        artist,
        genre,
        bpm,
        year,
        versions,
      };
    },
  );

  return info;
}

function clickElement(element) {
  const evt = window.document.createEvent('MouseEvents');
  evt.initEvent('click', true, true);
  element.dispatchEvent(evt);
  return element;
}

function getPreviousSibling(elem, selector) {
  // Get the next sibling element
  var sibling = elem.previousElementSibling;

  // If there's no selector, return the first sibling
  if (!selector) return sibling;

  // If the sibling matches our selector, use it
  // If not, jump to the next sibling and continue the loop
  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.previousElementSibling;
  }
}

function filterPrevDownloadedTracks(track, lastFetchedDate) {
  const lastFetchedTime = new Date(lastFetchedDate).getTime();
  const { dateAdded } = track;
  if (new Date(dateAdded).getTime() >= lastFetchedTime) return true;
  return false;
}
