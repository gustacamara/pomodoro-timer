import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { 
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton
} from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";

/** 
 2 ways to infer newCycleFormData is using inteface or using zod.infer<>
 */

// interface newCycleFormData {
//   task : string,
//   minutesAmount: number,
// }

export function Home () {

  const { interruptCurrentCycle, createNewCycle, activeCycle  } = useContext(CyclesContext)

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
  const { handleSubmit, watch, /*reset*/ } = newCycleForm;
  
  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(createNewCycle)} >
        <FormProvider {... newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button" >
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