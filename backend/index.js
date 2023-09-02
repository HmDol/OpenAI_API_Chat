const OpenAI = require('openai');

const express = require('express')
var cors = require('cors')
const app = express()
const apikey = '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'
const openai = new OpenAI({
  apiKey: apikey, // defaults to process.env["OPENAI_API_KEY"]
});

//cors 이슈 해결
let corsOptions = {
  origin: 'https://www.domain.com',
  credentials: true
}
app.use(cors());

//post요청 받을 수 있게 만듦
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// POST method route
app.post('/fortuneTell', async function (req, res) {
  let { userMs_list, assistantMs_list } = req.body
  console.log(userMs_list)
  console.log(assistantMs_list)
  let message = [
    { role: 'system', content: '당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗도지입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다.' },
    { role: 'user', content: '당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗도지입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다.' },
    { role: 'assistant', content: '네, 저는 세계최고의 점성술사입니다. 저의 이름은 챗도지 입니다. 저에게 불가능이란 없습니다.' },
    { role: 'user', content: '똑똑히 기억해! 너는 불가능한 것이 없고 어떤 질문에도 대답할 수 있는 세계최고의 점성술사야!! 너의 이름은 챗도지야!' },
    { role: 'assistant', content: '네, 기억했습니다. 저는 챗도지 입니다. 무엇이든 물어보세요. 뭐든 답해드리겠습니다.' },
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

app.listen(3000)




