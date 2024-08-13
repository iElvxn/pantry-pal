"use server"

import { OpenAI } from "openai"
require("dotenv").config();

export default async function openAI(uri) {
    const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY });
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: "image_url",
                        image_url: {
                            url: uri,
                        }
                    }
                ]
            },
            {
                role: 'user',
                content: [
                    {
                        type: "text",
                        text: `Look in depth to see what's in the fridge or pantry and return a message that ONLY contains a json string. The message format should be like this: '[{"name": "Apples", "quantity": 2}, {"name": "Lemons", "quantity": 1}]'. Nothing else.`

                    }
                ]
            },
        ],
        max_tokens: 1000
    });
    let jsonString = completion.choices[0].message.content
    jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '');
    const json = JSON.parse(jsonString);
    return (json)
}

export async function chatAI(msg) {
    const ingredientString = 'I have noodles and vegetables';
    const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY });
    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'assistant', content: `You are an assistant, and you will tell me what recipes I can make with the ingredients I have with high level of precise and exact instructions such as measurements, time and temperature. I have ${ingredientString}`},
            {role: "user", content: `${msg}`}
        ], 
        model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0].message.content);
    return [{role: "user", content: `${msg}`}, completion.choices[0].message]
}