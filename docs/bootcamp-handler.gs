// ===== ビジネスブートキャンプ（business-bootcamp-theta.vercel.app/apply.html）=====
// AI Creator Camp の Apps Script（クリエイターキャンプ）に追記して使う。
// doPost の振り分けに次の1行を足す：
//   if (d.kind === 'bootcamp') { return handleBootcamp(d); }
var BC_SHEET   = 'ブートキャンプ申込';
var BC_HEADERS = ['受付日時', 'お名前', 'メールアドレス', '紹介者', '送信元ページ'];
var BC_CONTACT = 'w.closet.k8114@gmail.com';
var BC_OPENCHAT = 'https://line.me/ti/g2/GYsm-IMVcy-HdyVekUXhbRN8p0aC4tSzVjt2Kg';

function handleBootcamp(d) {
  appendTo(BC_SHEET, BC_HEADERS, [new Date(), d.name || '', d.email || '', d.ref || '', d.page || '']);
  tell('【ビジネスブートキャンプ】申し込み：' + (d.name || '名前なし'), [
    'ビジネスブートキャンプに申し込みが入りました。',
    '',
    'お名前　： ' + (d.name || ''),
    'メール　： ' + (d.email || ''),
    '紹介者　： ' + (d.ref || '（なし）'),
    '',
    '※ この時点では決済が終わっていないことがあります。Stripe（結び）の入金も確認してください。'
  ]);
  try {
    var to = String(d.email || '').trim();
    if (to.indexOf('@') > 0) {
      MailApp.sendEmail({
        to: to,
        subject: '【ビジネスブートキャンプ】お申し込みを承りました',
        name: 'ビジネスブートキャンプ（村主悠真×つっちー）',
        replyTo: BC_CONTACT,
        body: [
          (String(d.name || '').trim() ? String(d.name).trim() + ' 様' : 'お申し込みいただいた方へ'),
          '',
          'ビジネスブートキャンプにお申し込みいただき、ありがとうございます。',
          '',
          '■ このあとの流れ',
          '1. 決済ページでお支払いください（一括・分割を選べます）',
          '2. お支払いが終わったら、参加者用のオープンチャットにお入りください',
          '   ' + BC_OPENCHAT,
          '3. 開始日や最初の進め方は、オープンチャットでご案内します（12月スタート）',
          '',
          'お支払いが途中になってしまった場合は、このメールにご返信ください。',
          'お支払い用のリンクを改めてお送りします。',
          '',
          '結び　つっちー',
          BC_CONTACT
        ].join('\n')
      });
    }
  } catch (err) { /* noop */ }
  return json({ ok: true });
}
