/*
 * 自動採番のサンプルプログラム
 * Copyright (c) 2015 Cybozu
 *
 * Licensed under the MIT License
 */

(function() {

  'use strict';

  // レコード追加、編集画面の表示前処理
  var eventsShow = ['app.record.create.show', 'app.record.edit.show', 'app.record.index.edit.show'];
  kintone.events.on(eventsShow, function(event) {

    var record = event.record;

    if (('app.record.create.show').indexOf(event.type) >= 0) {
      record.会社コード.value = '';
    }
    record.会社コード.disabled = true;

    return event;

  });

  // レコード追加画面の保存前処理
  kintone.events.on('app.record.create.submit', function(event) {

    var recNo = 1;
    var record = event.record;
    var m = moment();
    // URLを設定する
    var appUrl = kintone.api.url('/k/8/records', true) +
    '?app=' + kintone.app.getId() + '&query=' + encodeURI('limit 1&fields[0]=$id');

    var xmlHttp = new XMLHttpRequest();

    // 同期リクエストを行う
    xmlHttp.open('GET', appUrl, false);
    xmlHttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xmlHttp.send(null);

    window.alert(xmlHttp.status)
    if (xmlHttp.status === 200) {
      if (window.JSON) {
        var obj = JSON.parse(xmlHttp.responseText);
        if (obj.records.length > 0) {
          try {
            recNo = parseInt(obj.records[0].$id.value, 10) + 1;
          } catch (e) {
            event.error = '会社コードが取得できません。';
          }
        }
        // 自動採番を会社コードに設定する
        var autoEstNo = m.format('YYYYMMDD') + '-E' + ('000' + recNo).slice(-3);
        alert('会社コード ' + autoEstNo + ' を登録します');
        record.会社コード.value = autoEstNo;
      } else {
        event.error = xmlHttp.statusText;
      }
    } else {
      record.会社コード.error = '会社コードが取得できません。';
    }
    return event;
  });
})();