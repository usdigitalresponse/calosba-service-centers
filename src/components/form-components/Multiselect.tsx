import React  from 'react'
import { Question } from '~/forms/types'
import { Box, Text, CheckBox } from 'grommet'
import './single-select.css'
import { useFormField } from '~/contexts/form'

interface Props {
  value: string[]
  question: Question
  onChange: (val: string[]) => void
  [key: string]: any
}

const Multiselect: React.FC<Props> = (props) => {
  const { question } = props
  const [ value, setValue ] = useFormField(question.id) as [string[] | string, any]

  const onSelectValue = (option: string) => {
    if (!value) {
      return setValue([option])
    }
    if (!Array.isArray(value)) {
      return setValue([value, option])
    }
    if (value.includes(option)) {
      return setValue(value.filter(val => val !== option))
    }

    setValue([...value, option])
  }

  if (!question || !question.options) {
    return <Box />
  }

  return (
    <Box as="form">
      {question.options.map(o => {
        const isSelected = value && value.includes(o.id) || false;
        return (
          <Box 
            onClick={() => onSelectValue(o.id)} 
            style={{ background: isSelected ? "#EBFFFA" : "white"}} 
            key={o.id} 
            margin={{ bottom: 'xsmall' }} 
            pad='small' 
            className="single-select" 
            direction="row"
            align="center"
          >
            <Box margin={{ right: 'small' }}>
              <CheckBox
                checked={isSelected}
              />
            </Box>
            <Text>{o.name}</Text>
          </Box>
        )
      })}
    </Box>
  )
}

export default Multiselect
