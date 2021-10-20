import { MessageEmbed } from 'discord.js';

export const createQuizEmbed = async (quizData: any, isReply: boolean): Promise<MessageEmbed> => {
    // https://quizapi.io/docs/1.0/category
    const embed =  new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Question : ${quizData.question}`)
        .addFields(
            Object.keys(quizData.answers)
                .filter(key => quizData.answers[key] !== null)
                .map(key => {
                    return { 
                        name: `${key.substring(7).toUpperCase()} : `,
                        value: quizData.answers[key],
                    }
                })
        )
        .setThumbnail('attachment://quiz_boss.jpg');;

    if (isReply) {
        if (quizData.multiple_correct_answers === 'false' && quizData.correct_answer) {
            embed.addField("Answer : ", quizData.correct_answer.substring(7).toUpperCase())
        } else if (quizData.multiple_correct_answers === 'true') {
            const answers = Object.keys(quizData.correct_answers)
                .filter(key => quizData.correct_answers[key] === 'true')
                .map(key => {
                    return key.charAt(7).toUpperCase();
                });
            embed.addField("Answers : ", answers.toString());
        }

        if (quizData.multiple_correct_answers === 'false' && !quizData.correct_answer) {
            // WTF case...
            // Example response...
            // {
            //     id: 823,
            //     question: 'BASH stands for:',
            //     description: null,
            //     answers: {
            //       answer_a: 'Bourne Again SHell',
            //       answer_b: 'BAsic SHell',
            //       answer_c: 'Basic Async SHell',
            //       answer_d: null,
            //       answer_e: null,
            //       answer_f: null
            //     },
            //     multiple_correct_answers: 'false',
            //     correct_answers: {
            //       answer_a_correct: 'true',
            //       answer_b_correct: 'false',
            //       answer_c_correct: 'false',
            //       answer_d_correct: 'false',
            //       answer_e_correct: 'false',
            //       answer_f_correct: 'false'
            //     },
            //     correct_answer: null,
            //     explanation: null,
            //     tip: null,
            //     tags: [ { name: 'BASH' } ],
            //     category: 'Linux',
            //     difficulty: 'Easy'
            //   }
            const answers = Object.keys(quizData.correct_answers)
                .filter(key => quizData.correct_answers[key] === 'true')
                .map(key => {
                    return key.charAt(7).toUpperCase();
                });
            embed.addField("Answers : ", answers.toString());
        }

        if (quizData.explanation) {
            embed.addField("Explanation : ", quizData.explanation);
        }
        
        embed.setImage('attachment://omitted.jpg');
    } else {
        embed.addField("Answer : ", "The answer will be revealed in 10 seconds.")
    }

    return embed;
}