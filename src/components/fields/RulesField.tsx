import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  Paper,
  Tooltip,
  Link, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, InputBase
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import HelpIcon from '@material-ui/icons/Help';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { GlobalContext } from '../../context';
import { FieldProps } from '../../types';

interface RulesFieldProps extends FieldProps {
  value: string[];
}

export default function RulesField({ name, value, onUpdate }: RulesFieldProps) {
  const { setReference } = useContext(GlobalContext);
  const [show, setShow] = useState(true);

  const removeAuthor = (index = 0) => {
    const newAuthors = value.filter((a, i) => i !== index);
    onUpdate(name, newAuthors);
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = Number(e.target.dataset.index);
    let newValue = [...value];
    newValue[index] = e.target.value;
    onUpdate(name, newValue);
  };

  const handleClickReference = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setReference(e.currentTarget.href);
  };

  const handleAddRule = () => {
    onUpdate(name, [
      ...value,
      ''
    ]);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // @ts-ignore
    const index = Number(e.target.dataset.index);
    // @ts-ignore
    if (e.key === 'Backspace' && ((e.target.value === '') && (value[index] === ''))) {
      onUpdate(name, value.filter((rule, i) => i !== index));
    }
  };

  return (
    <Paper
      variant="outlined"
      elevation={0}
      sx={{ position: 'relative', py: 2, px: 2, ml: -2, mr: -2 }}
      style={{ borderLeft: '0 none', borderRight: '0 none', borderRadius: 0 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mt: -0.5, pr: 4 }}>
        <FormLabel component="div" sx={{ mr: 'auto' }}>
          {`Rules (${value.length})`}
          <Tooltip disableInteractive={false} title={
            <>
              <div>A major author of the map</div>
              <div>
                <Link color="inherit" href="https://pgm.dev/docs/modules/information/rules/" onClick={handleClickReference}>
                  See reference
                  <ArrowRightAltIcon fontSize="small" sx={{ ml: 0.5 }} style={{ verticalAlign: 'middle' }} />
                </Link>
              </div>
            </>
          }>
            <HelpIcon sx={{ ml: 0.5 }} fontSize="inherit" color="disabled" tabIndex={0} style={{ verticalAlign: 'middle' }} />
          </Tooltip>
        </FormLabel>
        <Button size="small" variant="outlined" startIcon={<AddIcon />} onClick={handleAddRule}>Add rule</Button>
      </Box>
      <div style={{ display: show ? 'block' : 'none' }}>
        {value.length > 0 && (
          <TableContainer component={Paper} elevation={0} square variant="outlined" sx={{ mt: 2 }} style={{ borderBottom: 'none' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 1 }}>#</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {value.map((rule, i) => (
                  <TableRow hover key={i}>
                    <TableCell sx={{ borderRight: (theme) => `1px solid ${theme.palette.divider}` }} style={{ verticalAlign: 'top' }}>
                      {i+1}
                    </TableCell>
                    <TableCell style={{ paddingTop: 0, paddingBottom: 0 }}>
                      <InputBase
                        fullWidth
                        multiline
                        value={rule}
                        onChange={handleChangeInput}
                        inputProps={{ 'data-index': i }}
                        style={{ fontSize: '0.875rem' }}
                        onKeyDown={handleKeyUp}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <Box sx={{ position: 'absolute', top: 0, right: 0, m: 1.5 }}>
        <Tooltip title={show ? 'Minimize' : 'Maximize'}>
          <IconButton size="small" onClick={() => setShow(!show)}>
            <KeyboardArrowDownIcon fontSize="small" style={{ transform: show ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  )
}
