const OpenAI = require('openai');

const express = require('express')
var cors = require('cors')
const app = express()
const apikey = "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"
const openai = new OpenAI({
    apiKey: apikey, // defaults to process.env["OPENAI_API_KEY"]
  }); 

//cors 이슈 해결
// let corsOptions = {
//     origin: 'https://www.domain.com',
//     credentials: true
// }
app.use(cors());

//post요청 받을 수 있게 만듦
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// POST method route
app.get('/fortuneTell', async function (req, res) {
        const completion = await openai.chat.completions.create({
          messages: [
            { role: 'system', content: '당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗도지입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다.' },
            { role: 'user', content: '당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗도지입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다.' },
            { role: 'assistant', content: '당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗도지입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다.' },
            { role: 'user', content: '오늘의 운세가 뭐야?' }

          ],
          model: 'gpt-3.5-turbo',
        });
      //   console.log(completion.choices);
        let fortune = completion.choices[0].message['content'];
        console.log(fortune);
        res.send(fortune);
  });

app.listen(3000)


   
