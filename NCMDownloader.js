// ==UserScript==
// @name         NCMDownloader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  A convinent tool to download NCM musics
// @author       LeeZ1Q
// @match        https://music.163.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=music.163.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('hashchange', function () {
        this.location.reload();
    });

    window.addEventListener('load', function () {
        // URL Test
        if (this.location.href.split('/#/')[1].startsWith('song')) {
            main();
        }
    });

    function main(){
        let url = getDownloadLink();
        let albumCover = getAlbumCover();
        let buttonBox = getButtonBox();
        if (!isVIP(buttonBox)) addDownloadButton(buttonBox,url,albumCover);
    }

    function getDownloadLink(){
        let curLink = window.location.href;
        const ID = curLink.split('id=')[1];
        return `http://music.163.com/song/media/outer/url?id=${ID}.mp3`;
    }

    function getAlbumCover(){
        let iframe  = document.querySelector('#g_iframe');
        let albumCover = iframe.contentDocument.querySelector('.j-img');
        return albumCover.dataset.src;
    }

    function getButtonBox(){
        let iframe  = document.querySelector('#g_iframe');
        let buttonBox = iframe.contentDocument.querySelector('#content-operation');
        return buttonBox;
    }

    function addDownloadButton(buttonBox,url,albumCover){
         // Add Button
         let button = document.createElement('a');
         button.classList.add('u-btni', 'u-btni-dl');
         button.style.width = '80px';
         button.style.marginTop = '10px';
         button.innerHTML = '<i style="font-weight: bold;">直链下载</i>';
         // Set Link 同时打开
         button.target = '_blank';
         button.addEventListener('click', function () {
            window.open(url);
            window.open(albumCover);
          });

         buttonBox.append(button);
    }

    function isVIP(buttonBox) {
        let firstButton = buttonBox.firstElementChild;
        let songType = firstButton.firstElementChild.innerHTML;
        return songType.includes('VIP');
      }
})();