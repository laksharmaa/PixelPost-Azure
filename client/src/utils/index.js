import {surpriseMePrompts} from '../constant'

export function getRandomPrompt(prompt)
{
    const randomIndex= Math.floor(Math.random()*surpriseMePrompts.length);
    const randomPrompt= surpriseMePrompts[randomIndex];

    // check for same random prompt
    if(randomPrompt===prompt) return getRandomPrompt(prompt)

    return randomPrompt;
}