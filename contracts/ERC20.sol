//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;


interface ERC20{
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view  returns (uint8);
    function totalSupply() external view returns (uint256);
    function balanceOf(address _owner) external view returns (uint256 balance);
    function transfer(address _to, uint256 _value) external returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);
    function approve(address _spender, uint256 _value) external returns (bool success);
    function allowance(address _owner, address _spender) external view returns (uint256 remaining);
    
}


contract Owner{
    address public owner;
    address public newOwner;
    event ChangeOwner(address indexed _owner,address indexed _newOwner);

    constructor(){
        owner = msg.sender;
    }
    function changeOwner(address _newOwner)public{
        require(owner == msg.sender,"Only Owner can call");
        newOwner = _newOwner;
    }

    function accept()public {
        require(msg.sender == newOwner,"Only new Owner can call");
        emit ChangeOwner(owner,newOwner);
        owner = newOwner;
        newOwner = address(0);
    }

}


contract MyERC20 is Owner {
    string public _name;
    string public _symbol;
    uint8 public _decimals;
    uint public _totalSupply;
    mapping(address => uint) tokenBalance;
    address public minter;
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    mapping(address =>mapping(address => uint256)) public allowed;

    constructor(uint256 initialSupply){
        _name = "Your Token";
        _symbol = "YRT";
        _totalSupply = initialSupply;
        minter = msg.sender;
        tokenBalance[minter] = _totalSupply; 
    }

    function name() external view  returns (string memory){
        return _name;
    }
    function symbol() external view returns (string memory){
        return _symbol;
    }
    function decimals() external view returns (uint8){
        return _decimals;
    }

    function totalSupply() external view returns (uint256){
            return _totalSupply;
    }
    function balanceOf(address _owner) external view returns (uint256 balance){
        return tokenBalance[_owner];
    }
    function transfer(address _to, uint256 _value) external returns (bool success){
       require(tokenBalance[msg.sender] >= _value,"Insufficient Token");
       tokenBalance[_to]+=_value;
       tokenBalance[msg.sender] -= _value;
       emit Transfer(msg.sender, _to, _value);
       return true; 
    }
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success){
        uint256 allowedBal = allowed[_from][msg.sender];
        require(allowedBal >= _value,"Insufficient Balance");
        tokenBalance[_from] -= _value;
        tokenBalance[_to] += _value;
        return true;
    }
    function approve(address _spender, uint256 _value) external returns (bool success){
    require(tokenBalance[msg.sender] >= _value,"Insufficient Token");
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender,_spender,_value);
        return true;
    }
    function allowance(address _owner, address _spender) external view returns (uint256 remaining){
        return allowed[_owner][_spender];
    }


}


