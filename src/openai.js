// import { Configuration, OpenAIApi } from 'openai';
// // const { Configuration,OpenAIApi }= require('openai');

// const openai=new OpenAIApi(configuration);
// export async function sendMsgToOpenAI(message)
// {
//   const res=await openai.createCompletion({
//     model:'text-davinci-003',
//     prompt: message,
//     temperature:0.7,
//     max_tokens:256,
//     top_p:1,
//     frequency_penalty:0,
//     presense_penalty:0
//   });
//   return res.data.choices[0].text;
// }
const OpenAI = require("openai");

const openai = new OpenAI( {
  apiKey: "YOUR-API-KEY",dangerouslyAllowBrowser: true
});

// const openFun=async()=>{
export async function sendMsgToOpenAI(message){
const chatCompletion = await openai.chat.completions.create({
    model: "text-davinci-003",
    prompt: message,
    temperature:0.7,
    top_p:1,
    frequency_penalty:0,
    messages: [{"role": "user", "content": "YOUR PROMPT TEXT",}],
    max_tokens:256,
    presense_penalty:0
  });
  console.log(chatCompletion.choices[0].message.content);
}

// openFun();   