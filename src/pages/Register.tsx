import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import UserRegister from '../components/UserRegister';
import PublisherRegister from '../components/PubliserRegister';

enum UserType {
  USER = 'user',
  PUBLISHER = 'publisher',
}

const Register = () => {
  const [selectedType, setSelectedType] = useState<UserType | ''>('');

  const handleTypeChange = (event: SelectChangeEvent<{ value: UserType }>) => {
    setSelectedType(event.target.value as UserType);
  };



  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '72vh' }}>
       <h3 style={{margin:'20px 0'}}>Register Page</h3>
      <FormControl style={{ minWidth: 120 }}>
        <InputLabel id="user-type-label">Which</InputLabel>
        <Select
          labelId="user-type-label"
          id="user-type"
          value={selectedType}
          label="Select Type" 
          onChange={handleTypeChange}
          inputProps={{
            value: selectedType,
          }}
        >
          <MenuItem value={'user'}>User</MenuItem>
          <MenuItem value={'publisher'}>Publisher</MenuItem>
        </Select>

      </FormControl>
      {selectedType === UserType.USER && <UserRegister />}
      {selectedType === UserType.PUBLISHER && <PublisherRegister />}
    </div>
  );
};

export default Register;
