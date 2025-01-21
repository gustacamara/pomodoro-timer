import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod.number()
  .min(5, "O ciclo precisa ser de no minimo 5min")
  .max(60, "O ciclo precisa ser no máximo de 60min"),
});
/** 
interface newCycleFormData {
  task : string,
  minutesAmount: number,
}

===

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

2 ways to infer newCycleFormData
*/

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home () {

  const { register, handleSubmit, watch } = useForm<newCycleFormData>({ 
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }

  });

  function handleCreateNewCycle( data: newCycleFormData) {
    console.log(data);
  };


  const task = watch('task');
  const isSubmitDisabled = !task;
  
  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            type="text" 
            placeholder="Dê nome pro projeto"
            list="task-suggestions"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="opção 01"></option>
            <option value="opção 02"></option>
            <option value="opção 03"></option>
            <option value="opção 04"></option>
            <option value="banana"></option>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput 
            id="minutesAmount"
            type="number" 
            placeholder="00" 
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', {valueAsNumber: true})}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit" >
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}