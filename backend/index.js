const OpenAI = require('openai');
const serverless = require('serverless-http'); // 서버리스를 위한 코드
const express = require('express')
var cors = require('cors')
const app = express()
const apikey = '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'
const openai = new OpenAI({
  apiKey: apikey, // defaults to process.env["OPENAI_API_KEY"]
});

//cors 이슈 해결
let corsOptions = {
  origin: 'https://chatdoge-test-6eg.pages.dev', //front 주소 넣기
  credentials: true
}
app.use(cors(corsOptions));

//post요청 받을 수 있게 만듦
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// POST method route
app.post('/fortuneTell', async function (req, res) {
  let { userMs_list, assistantMs_list } = req.body

  
  
  //console.log(userMs_list)
  //console.log(assistantMs_list)
  let message = [
    
    { role: 'system', content: '여행에 대해서 모르는 것이 없는 당신의 이름은 여행전문가 챗도지 입니다.' },
    { role: 'user', content: '여행에 대해서 모르는 것이 없는 당신의 이름은 여행전문가 챗도지 입니다.' },
    { role: 'assistant', content: '네, 저는 여행에 관해 모르는게 없는 여행전문가입니다. 저의 이름은 챗도지 입니다. 저에게 불가능이란 없습니다.' },
    // { role: 'user', content: `${mySeasonLocal} 놀거리를 간단하게 추천해줘!` },  // 수정된 부분: 템플릿 리터럴 사용
    
    
  ]

  while (userMs_list.length != 0 || assistantMs_list.length != 0) {
    if (userMs_list.length != 0) {
      message.push(
        JSON.parse('{"role" : "user", "content" : "' + String(userMs_list.shift()).replace(/\n/g, "") + '"}')
      )
    }
    if (assistantMs_list.length != 0) {
      message.push(
        JSON.parse('{"role" : "assistant", "content" : "' + String(assistantMs_list.shift()).replace(/\n/g, "") + '"}')
      )
    }
  }

  console.log(message);

  const completion = await openai.chat.completions.create({
    messages: message,
    model: 'gpt-3.5-turbo',
    max_tokens: 500,
    temperature: 0.9,
    top_p: 0.9,
  });
  //   console.log(completion.choices);
  let fortune = completion.choices[0].message['content'];
  console.log(fortune);
  console.log('1');
  res.json({ "assistant": fortune });
});

//서버리스를 위한 모둘 변화
module.exports.handler = serverless(app);

//app.listen(3000)

