import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';
import LoadingSpinner from '../static/Rolling-1s-200px.svg';

import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type BusyProps = {
  open: boolean;
}

const Busy: React.FC<BusyProps> = ({ open }) => {
  
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
            <Box alignItems="center">
                <img src={LoadingSpinner} alt="Logo"/>
                <p style={{textAlign: 'center', color: "#2F2F4F",fontSize: "20px"}}>Please wait...</p>
            </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Busy