/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

document.addEventListener('DOMContentLoaded', () => {
  const formatObjectToString = (obj) => JSON.stringify(obj, null, 2);

  const emeRunButton = document.querySelector('#emeRun');

  emeRunButton.addEventListener('click', async () => {
    // Pull contents of query form.
    const keySystem = window.keySystem.input.value;
    // If encryptionScheme is blank, default to null.
    const encryptionScheme = window.encryptionScheme.input.value || null;
    const audio = window.audio.input.value;
    const video = window.video.input.value;

    const config = {};

    if (audio) {
      config.audioCapabilities = [{
        contentType: audio,
        encryptionScheme,
      }];
    }

    if (video) {
      config.videoCapabilities = [{
        contentType: video,
        encryptionScheme,
      }];
    }

    try {
      const mksa =
          await navigator.requestMediaKeySystemAccess(keySystem, [config]);
      results.textContent = formatObjectToString(mksa.getConfiguration());
    } catch (error) {
      results.textContent = formatObjectToString({error: error.message});
    }
  });  // emeRunButton click listener
});  // DOMContentLoaded listener
