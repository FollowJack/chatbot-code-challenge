import { useEffect, useState } from 'react';
import { IFlowAnswer, IFlowMessage } from '../shared/interfaces/chat.interface';

const useGetFlowMessages = () => {
  const INITIAL_NEXT_ID = 100;

  // {id,value}
  const [answerMapping, setAnswerMapping] = useState<IFlowAnswer[]>([]);

  // original flow messages
  const [flowMessages, setFlowMessages] = useState<IFlowMessage[]>([]);

  // these are the messages one by one
  const [orderedFlowMessages, setOrderedFlowMessages] = useState<
    IFlowMessage[]
  >([]);

  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const fetchFlow = () => {
      fetch('data/flow.json')
        .then((response) => response.json())
        .then((data) => {
          setFlowMessages(data);
          setInitialMessage(data);
        });
      // TODO catch error handling
      // e.g. use a toast to dispaly an error message, reset the state
    };
    fetchFlow();
  }, []);

  const getMessageById = (
    allMessages: IFlowMessage[],
    id: Number
  ): IFlowMessage => {
    const searchedMessage = allMessages.find((message) => message.id === id);
    if (searchedMessage === undefined) {
      throw new Error('The id was promised to always be there!');
    }
    return searchedMessage;
  };

  const setInitialMessage = (data: IFlowMessage[]) => {
    const initialMessage: IFlowMessage = getMessageById(data, INITIAL_NEXT_ID);
    setOrderedFlowMessages([initialMessage]);
  };

  const handleAnswer = (
    id: Number,
    nextId: Number,
    value: String,
    text: String,
    name: String
  ) => {
    // set answers
    const answer: IFlowAnswer = { id, nextId, value, text, name };
    const newAnswerMapping: IFlowAnswer[] = [...answerMapping, answer];
    setAnswerMapping(newAnswerMapping);
    // set ordered messages
    if (nextId) {
      let newOrderedFlowMessages: IFlowMessage[] = [];
      const initialMessage: IFlowMessage = getMessageById(
        flowMessages,
        INITIAL_NEXT_ID
      );
      newOrderedFlowMessages.push(initialMessage);
      newAnswerMapping.forEach(({ id, nextId, value, text }: IFlowAnswer) => {
        const message = getMessageById(flowMessages, nextId);
        newOrderedFlowMessages.push(message);
      });
      setOrderedFlowMessages(newOrderedFlowMessages);
    }

    // if finishes
    else {
      sendAnswers();
    }
  };

  const sendAnswers = () => {
    const answers = answerMapping.map(({ name, value }: IFlowAnswer) => ({
      name,
      value
    }));
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers)
    };
    fetch(
      'https://virtserver.swaggerhub.com/L8475/task/1.0.1/conversation',
      requestOptions
    ).then(() => setIsDone(true));
    // TODO add error handling
  };

  const handleReset = () => {
    setInitialMessage(flowMessages);
    setAnswerMapping([]);
    setIsDone(false);
  };

  return [
    orderedFlowMessages,
    answerMapping,
    handleAnswer,
    isDone,
    handleReset
  ] as const;
};
export default useGetFlowMessages;
