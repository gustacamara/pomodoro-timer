import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { createContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { 
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton
} from "./styles";

/** 
 2 ways to infer newCycleFormData is using inteface or using zod.infer<>
 */

// interface newCycleFormData {
//   task : string,
//   minutesAmount: number,
// }
export const CyclesContext = createContext({} as CyclesContextType)

interface Cycle{
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  activeCycle : Cycle | undefined;
  activeCycleId : string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
}

export function Home () {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [ activeCycleId, setActiveCycleId] = useState<string | null>(null); 
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  
  type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;
  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod.number()
      .min(1, "O ciclo precisa ser de no minimo 5min")
      .max(60, "O ciclo precisa ser no máximo de 60min"),
  });
  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  }); 
  const { handleSubmit, watch, reset } = newCycleForm;

  function setSecondsPassed(seconds: number ) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished () {
    setCycles(state =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      }),
    )
  }

  function handleCreateNewCycle( data: newCycleFormData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles(state =>[...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);

    reset();
  };

  function handleInteruptCycle() {
    setCycles( state =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        }else{
          return cycle;
        }
      })
    )
    setActiveCycleId(null);
  }

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)} >
        <CyclesContext.Provider 
          value={ {
            activeCycle,
            activeCycleId, 
            markCurrentCycleAsFinished, 
            amountSecondsPassed, 
            setSecondsPassed 
          } }
        >
          <FormProvider {... newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInteruptCycle} type="button" >
            <HandPalm size={24} /> 
            interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )} 
      </form>
    </HomeContainer>
  )
}