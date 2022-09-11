import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Table, TableRow, TableHead, TableCell, TableBody, TableSortLabel, TableContainer, TablePagination, IconButton } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { FiEdit2, FiTrash } from "react-icons/fi";
import RenderIf from '../../hooks/RenderIf';
import whitelistApi from '../../api/whitelistApi';
import usersApi from '../../api/usersApi';
import './EnhancedTable.css';


export default function EnhancedTable(props) {
    const [rows, setRows] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('user'); //? 1ER ORDEN
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [userDeleted, setUserDeleted] = useState('');

    useEffect(() => {
        handleExternalUser();
    }, [props.registerUser.display, userDeleted]);

    const handleExternalUser = async () => {
        await whitelistApi
            .getWhitelist()
            .then((response) => {
                let listRows = []

                for (let user in response) {
                    listRows.push({
                        user: response[user]['email'].split('@')[0],
                        email: response[user]['email'],
                        roles: response[user]['roles'] ? response[user]['roles'] : ' - '
                    })
                }
                setRows(listRows)
            })
            .catch((e) => {
                console.log(e);
                props.notification({ severity: 'error', message: 'Hubo un error al cargar la lista.' })
            });
    };

    const handleDeleteUser = async (userEmail) => {
        await usersApi
            .deleteUser(userEmail)
            .then((response) => {
                setUserDeleted(userEmail)
                props.notification({ severity: 'success', message: 'Eliminado correctamente!' })
            })
            .catch((error) => {
                console.log(error);
                setUserDeleted(userEmail)
                props.notification({ severity: 'error', message: 'Hubo un error al Eliminar el usuario.' })
            });
    };

    const handleButton = (row) => {
        return (
            <>
                <IconButton onClick={(e) => { props.setRegisterUser(registerUser => ({ ...registerUser, display: '', email: row.email, roles: row.roles })); }} aria-label="modify" style={{ color: '#404040', marginRight: '5px' }}>
                    <FiEdit2 />
                </IconButton>
                <IconButton onClick={(e) => { handleDeleteUser(row.email); }} aria-label="delete" style={{ color: '#be0000' }}>
                    <FiTrash />
                </IconButton>
            </>
        )
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';

        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function labelDisplayedRows({ from, to, count }) {
        return `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`;
    }

    function getItemAriaLabel(type) {
        return `Ir a la ${type === 'previous' ? 'anterior' : type === 'next' ? 'siguiente' : 'primer'} pagina`;
    }

    return (
        <>
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size='medium'
                >
                    <EnhancedTableColumns
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;
                                const email = row['email'];

                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={labelId}
                                    >
                                        {
                                            Object.entries(row).map((key, value) => {
                                                return (
                                                    <TableCell key={key + value} id={key[0]} sx={{ whiteSpace: 'pre-wrap' }}>
                                                        {key[1]}
                                                    </TableCell>)
                                            })
                                        }
                                        <TableCell align="center" key={'action' + index} id={'btn_' + email} name='actions' sx={{ whiteSpace: 'pre-wrap' }}>
                                            {handleButton(row)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                showFirstButton={true}
                component="div"
                page={page}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage='Filas por pagina:'
                onPageChange={handleChangePage}
                labelDisplayedRows={labelDisplayedRows}
                getItemAriaLabel={getItemAriaLabel}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}

function EnhancedTableColumns(props) {
    const headColumns = [
        {
            id: 'user',
            disablePadding: true,
            label: 'Usuario',
        },
        {
            id: 'email',
            disablePadding: false,
            label: 'Email',
        },
        {
            id: 'roles',
            disablePadding: false,
            label: 'Roles',
        },
        {
            btn_id: 'btn_actions',
            disablePadding: false,
            label: 'Acciones',
        },
    ];
    const { order, orderBy, onRequestSort } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headColumns.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        style={{ width: headCell.width }}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={headCell.id ? createSortHandler(headCell.id) : undefined}
                        >
                            {headCell.label}
                            <RenderIf isTrue={orderBy === headCell.id}>
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            </RenderIf>
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableColumns.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};