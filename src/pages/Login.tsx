import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import UserLogin from "../components/UserLogin"
import PublisherLogin from "../components/PublisherLogin"

enum UserType {
  USER = 'user',
  PUBLISHER = 'publisher',
}
const Login = () => {
  const [selectedType, setSelectedType] = useState<UserType | ''>('');

  const handleTypeChange = (event: SelectChangeEvent<{ value: UserType }>) => {
    setSelectedType(event.target.value as UserType);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '90vh' }}>
      <h3 style={{margin:'20px 0'}}>Login Page</h3>
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
      {selectedType === UserType.USER && <UserLogin />}
      {selectedType === UserType.PUBLISHER && <PublisherLogin />}
    </div>
  );
};

export default Login;
