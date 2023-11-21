import React, { useState } from "react";

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip, Stack, Button, Menu, MenuItem, Typography } from '@mui/material';
import { NavLink } from "react-router-dom";

const header = ["Title"]

const KnowledgeList = ({data, handleClick}) => {
  

    return (
        <TableContainer>
            <Table sx={{ minWidth:650 }}>
                <TableHead>
                    <TableRow>
                        {header.map((header) => (
                            <TableCell sx={{fontWeight: 'bold'}} key={header}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={i}>                            
                            <TableCell component={NavLink} to={`/knowledge/${i}`}>
                                {row.title}
                            </TableCell>                        
                        </TableRow>
                    ))}
                    
                </TableBody>
            </Table>          
        </TableContainer>
    )
}

export default KnowledgeList;