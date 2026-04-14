export const instructor = {
  name: 'Trần Vĩnh Phúc',
  email: 'phuctv@dlu.edu.vn',
  phone: '0976 353 605',
  university: 'Đại học Đà Lạt (DLU)',
  dept: 'Khoa Công nghệ Thông tin',
  avatar: 'PT',
  bio: 'Giảng viên chuyên ngành Mạng Máy Tính & SDN. Nghiên cứu về Software-Defined Networking, Edge Networking và Internet of Things.',
  expertise: ['SDN / OpenFlow', 'Mạng Máy Tính', 'Edge Networking', 'Linux Networking', 'Network Security', 'IoT', 'Edge Ai'],
}

export const chapters = [
  {
    id:'c1', n:1, icon:'', color:'#00d4ff', diff:'beginner', time:'3 giờ',
    title:'Giới thiệu SDN & Mininet',
    sections:[
      { id:'s1-1', title:'SDN là gì?', md:`
## Software Defined Networking (SDN)

**SDN** tách biệt **Control Plane** (logic điều khiển) khỏi **Data Plane** (chuyển tiếp gói tin), cho phép quản lý mạng tập trung qua phần mềm.

### Kiến trúc 3 tầng

- **Application Layer** — Ứng dụng nghiệp vụ: load balancer, firewall, monitoring
- **Control Layer** — SDN Controller: não bộ của mạng, tính toán đường đi
- **Infrastructure Layer** — Switch/Router: nhận lệnh, thực thi chuyển tiếp

### Lợi ích của SDN

1. **Tập trung hóa quản lý**: Toàn bộ mạng điều khiển từ một điểm
2. **Lập trình được**: Thay đổi hành vi mạng qua code Python/Java
3. **Linh hoạt & tự động hóa**: Cấu hình tự động theo nhu cầu real-time
4. **Tiết kiệm chi phí**: Dùng commodity hardware thay vì thiết bị độc quyền
5. **Đổi mới nhanh**: Thử nghiệm tính năng mới không ảnh hưởng production

### So sánh với mạng truyền thống

| Tiêu chí | Mạng truyền thống | SDN |
|---------|-----------------|-----|
| Điều khiển | Phân tán (mỗi thiết bị) | Tập trung (controller) |
| Cấu hình | CLI từng thiết bị | API / GUI |
| Đổi mới | Chậm (vendor lock) | Nhanh (open source) |
| Chi phí | Cao (proprietary) | Thấp (commodity) |
| Khả năng mở rộng | Phức tạp | Dễ dàng |
` },
      { id:'s1-2', title:'Mininet là gì?', md:`
## Mininet — Network Emulator

**Mininet** tạo mạng ảo hoàn chỉnh trên một máy Linux, chạy **tiến trình thực**, **kernel thực**, **packet thực**.

> Khác với simulator, Mininet **emulate** — code chạy thật trong Linux namespace, không chỉ mô phỏng!

### Cơ chế hoạt động

- **Linux Network Namespaces** → Cô lập mỗi host hoàn toàn
- **Open vSwitch (OVS)** → Software switch hỗ trợ OpenFlow
- **Veth Pairs** → Dây kết nối ảo giữa các node

### So sánh công cụ

| Công cụ | Loại | Ưu điểm | Nhược điểm |
|---------|------|---------|-----------|
| **Mininet** | Emulator | Nhẹ, nhanh, Python API | Giới hạn ở Linux |
| **GNS3** | Emulator | GUI đẹp, nhiều thiết bị | Nặng, cần RAM nhiều |
| **ns-3** | Simulator | Chính xác cao | Phức tạp, không chạy code thật |
| **EVE-NG** | Emulator | Gần thiết bị thật | Trả phí cho bản đầy đủ |

### Ứng dụng

1. Học tập và nghiên cứu SDN
2. Prototype và kiểm thử controller
3. Phát triển và test network applications
4. Thí nghiệm topology và protocol
` },
      { id:'s1-3', title:'OpenFlow Protocol', md:`
## OpenFlow — Giao thức lõi của SDN

OpenFlow là giao thức **southbound** chuẩn để Controller giao tiếp với Switch.

### Flow Table Entry

| Thành phần | Mô tả |
|-----------|-------|
| **Match Fields** | Điều kiện: IP src/dst, MAC, port, VLAN, protocol |
| **Priority** | Độ ưu tiên khi nhiều rule khớp |
| **Counters** | Đếm packets/bytes đi qua flow |
| **Instructions** | Hành động: output, drop, modify header, go-to-table |
| **Timeouts** | idle_timeout, hard_timeout |
| **Cookie** | Tag để quản lý flow |

### Vòng đời gói tin trong OpenFlow Switch

1. Packet đến → Tra cứu flow table theo priority
2. Khớp rule → Thực thi action (forward/drop/modify)
3. **Không khớp** → Table-miss: gửi lên Controller (Packet-In)
4. Controller quyết định → Gửi lại (Packet-Out) + cài flow mới

### Các phiên bản

- **OpenFlow 1.0** — Đơn giản, 1 flow table, phổ biến học tập
- **OpenFlow 1.3** — Multiple tables, groups, meters, **production-ready**
- **OpenFlow 1.5** — Egress tables, bundle messages

> Giáo trình này dùng chủ yếu **OpenFlow 1.3**
` },
    ],
    quiz:[
      { id:'q1-1', q:'SDN tách biệt điều gì so với mạng truyền thống?', opts:['Hardware và Software','Control Plane và Data Plane','Router và Switch','IPv4 và IPv6'], ans:1, exp:'SDN tách Control Plane (logic điều khiển, tính đường đi) ra khỏi Data Plane (chuyển tiếp gói tin), đưa logic lên Controller tập trung.' },
      { id:'q1-2', q:'Mininet sử dụng gì để cô lập các host?', opts:['Virtual Machines','Docker containers','Linux Network Namespaces','VLAN tagging'], ans:2, exp:'Mininet dùng Linux Network Namespaces — nhẹ hơn nhiều so với VM hay Docker, nhưng vẫn cô lập hoàn toàn network stack.' },
      { id:'q1-3', q:'OpenFlow là giao thức giao tiếp giữa?', opts:['Host và Switch','Controller và Switch','Router và Router','Switch và Switch'], ans:1, exp:'OpenFlow là southbound interface giữa SDN Controller và OpenFlow-enabled Switch.' },
      { id:'q1-4', q:'Mininet được gọi là "emulator" vì?', opts:['Chỉ mô phỏng bằng toán học','Chạy code Linux thực trong network namespace','Dùng máy ảo đầy đủ','Kết nối thiết bị thật'], ans:1, exp:'Mininet tạo tiến trình Linux thực với kernel stack thực — packet đi qua kernel thật, không chỉ mô phỏng hành vi.' },
    ],
    exercises:[
      { id:'ex1-1', title:'Vẽ kiến trúc SDN', diff:'easy', desc:'Vẽ sơ đồ 3 tầng SDN (Application/Control/Infrastructure) và giải thích northbound/southbound interface.', hints:['Northbound: Controller↔App','Southbound: Controller↔Switch (OpenFlow)'] },
      { id:'ex1-2', title:'So sánh công cụ mô phỏng', diff:'easy', desc:'So sánh Mininet, GNS3, ns-3 theo 5 tiêu chí. Khi nào dùng công cụ nào?' },
      { id:'ex1-3', title:'Tìm hiểu SDN Controllers', diff:'medium', desc:'Nghiên cứu Ryu, ONOS, OpenDaylight. So sánh kiến trúc, use case và cộng đồng.' },
    ]
  },
  {
    id:'c2', n:2, icon:'', color:'#00e676', diff:'beginner', time:'2 giờ',
    title:'Cài đặt & Cấu hình Môi trường',
    sections:[
      { id:'s2-1', title:'Yêu cầu hệ thống', md:`
## Yêu cầu hệ thống

| Thành phần | Tối thiểu | Khuyến nghị |
|-----------|-----------|-------------|
| **OS** | Ubuntu 18.04 LTS | Ubuntu 20.04/22.04 LTS |
| **RAM** | 2 GB | 4–8 GB |
| **CPU** | 2 cores | 4+ cores |
| **Disk** | 10 GB | 20+ GB |
| **Python** | 3.6+ | 3.8+ |

### Kiểm tra môi trường

\`\`\`bash
# Phiên bản OS
$ lsb_release -a

# Kiểm tra RAM
$ free -h

# Kiểm tra CPU cores
$ nproc

# Python version
$ python3 --version
\`\`\`
` },
      { id:'s2-2', title:'Cài đặt Mininet', md:`
## 3 Phương pháp cài đặt

### Phương pháp 1: apt (Đơn giản nhất)

\`\`\`bash
$ sudo apt-get update && sudo apt-get upgrade -y
$ sudo apt-get install mininet -y
$ mn --version
\`\`\`

### Phương pháp 2: Từ source (Đầy đủ nhất)

\`\`\`bash
$ git clone https://github.com/mininet/mininet.git
$ cd mininet
# Cài đầy đủ: Mininet + OVS + POX + OpenFlow tools
$ sudo util/install.sh -a
# Hoặc chỉ Mininet + OVS
$ sudo util/install.sh -nv
$ sudo mn --test pingall
\`\`\`

### Phương pháp 3: VM Image (Nhanh nhất)

1. Tải từ **http://mininet.org/download/**
2. Import vào VirtualBox/VMware
3. Login: **mininet / mininet**

### Dọn dẹp khi Mininet crash

\`\`\`bash
# Luôn chạy lệnh này trước khi khởi động lại
$ sudo mn -c
\`\`\`
` },
      { id:'s2-3', title:'Open vSwitch & Controllers', md:`
## Cài đặt Open vSwitch

\`\`\`bash
$ sudo apt-get install openvswitch-switch -y
$ sudo service openvswitch-switch start
$ sudo ovs-vsctl show
# Kiểm tra version
$ ovs-vsctl --version
\`\`\`

## Cài đặt Ryu Controller

\`\`\`bash
$ sudo pip3 install ryu
$ ryu-manager --version
# Chạy simple switch
$ ryu-manager ryu.app.simple_switch_13
\`\`\`

## Cài đặt POX Controller

\`\`\`bash
$ git clone http://github.com/noxrepo/pox.git
$ cd pox
# Chạy với L2 learning
$ python3 pox.py log.level --DEBUG forwarding.l2_learning
\`\`\`

## Packages Python cần thiết

\`\`\`bash
$ sudo pip3 install networkx matplotlib numpy flask requests
\`\`\`
` },
    ],
    quiz:[
      { id:'q2-1', q:'Lệnh dọn dẹp Mininet sau khi crash?', opts:['sudo mn --reset','sudo mn -c','sudo mn --clean','sudo mn --stop'], ans:1, exp:"'sudo mn -c' (viết tắt --clean) xóa namespace, OVS switch, veth interfaces còn sót lại." },
      { id:'q2-2', q:'Cài Mininet từ source với install.sh, flag nào cho đầy đủ nhất?', opts:['-n','-v','-a','-m'], ans:2, exp:"Flag '-a' cài ALL: Mininet, OVS, POX, Wireshark, OpenFlow reference implementation." },
      { id:'q2-3', q:'OVS là viết tắt của?', opts:['Open Virtual Switch','Open vSwitch','OpenFlow Virtual Switch','Open VPN Switch'], ans:1, exp:'OVS = Open vSwitch, phần mềm switch mã nguồn mở hỗ trợ OpenFlow, dùng làm switch ảo trong Mininet.' },
    ],
    exercises:[
      { id:'ex2-1', title:'Cài và test Mininet', diff:'easy', desc:'Cài Mininet bằng apt, chạy sudo mn --test pingall, giải thích từng dòng output.', code:`$ sudo apt-get install mininet -y\n$ sudo mn --test pingall\n# Kết quả mong đợi:\n*** Results: 0% dropped (2/2 received)` },
      { id:'ex2-2', title:'Cài Ryu và test', diff:'medium', desc:'Cài Ryu, chạy simple_switch_13 rồi kết nối Mininet. Verify bằng pingall.', code:`# Terminal 1:\n$ ryu-manager ryu.app.simple_switch_13\n# Terminal 2:\n$ sudo mn --controller=remote,ip=127.0.0.1,port=6653\nmininet> pingall` },
    ]
  },
  {
    id:'c3', n:3, icon:'', color:'#ffab40', diff:'beginner', time:'2.5 giờ',
    title:'Mininet CLI — Lệnh cơ bản',
    sections:[
      { id:'s3-1', title:'Các lệnh quản lý', md:`
## Khởi động Mininet CLI

\`\`\`bash
$ sudo mn
*** Creating network
*** Adding controller c0
*** Adding hosts: h1 h2
*** Adding switches: s1
*** Starting CLI:
mininet>
\`\`\`

### Lệnh quản lý topology

| Lệnh | Mô tả |
|------|-------|
| \`nodes\` | Liệt kê tất cả nodes |
| \`net\` | Hiển thị kết nối mạng |
| \`dump\` | Thông tin chi tiết mọi node |
| \`links\` | Liệt kê các liên kết |
| \`hosts\` | Chỉ hiển thị hosts |
| \`switches\` | Chỉ hiển thị switches |
| \`info\` | Thông tin topology |
| \`help\` | Xem tất cả lệnh |

### Lệnh thực thi trên host

\`\`\`bash
# Cú pháp: <host> <command>
mininet> h1 ifconfig
mininet> h1 ping -c 3 h2
mininet> h1 ip route
mininet> h2 arp
mininet> h1 curl http://10.0.0.2:8080
\`\`\`
` },
      { id:'s3-2', title:'Kiểm tra kết nối & OVS', md:`
## Kiểm tra kết nối

\`\`\`bash
# Ping tất cả pairs
mininet> pingall

# Đo TCP bandwidth
mininet> iperf

# Đo UDP bandwidth với target
mininet> iperfudp 100

# Ping cụ thể
mininet> h1 ping -c 5 -i 0.2 h3
\`\`\`

## Lệnh OVS

\`\`\`bash
# Xem flow table của switch s1
mininet> sh ovs-ofctl dump-flows s1

# Xem ports của switch
mininet> sh ovs-ofctl show s1

# Thêm flow rule thủ công
mininet> sh ovs-ofctl add-flow s1 'in_port=1,actions=output:2'

# Xóa flow rules
mininet> sh ovs-ofctl del-flows s1

# Xem OVS config
mininet> sh ovs-vsctl show
\`\`\`
` },
      { id:'s3-3', title:'Tùy chọn khởi động', md:`
## Tùy chọn khởi động Mininet

\`\`\`bash
# Topology sẵn có
$ sudo mn --topo single,5       # 1 switch, 5 hosts
$ sudo mn --topo linear,4       # 4 switches nối tiếp
$ sudo mn --topo tree,3,2       # Cây depth=3, fanout=2

# Cấu hình link
$ sudo mn --topo single,3 --link tc,bw=10,delay=5ms,loss=1

# Remote controller
$ sudo mn --controller=remote,ip=127.0.0.1,port=6653

# OpenFlow 1.3
$ sudo mn --switch ovs,protocols=OpenFlow13

# MAC đơn giản (00:00:00:00:00:01...)
$ sudo mn --mac

# Test tự động rồi thoát
$ sudo mn --test pingall

# Mở xterm cho từng host
$ sudo mn -x
\`\`\`

| Flag | Mô tả |
|------|-------|
| \`--topo\` | Loại topology |
| \`--switch\` | Loại switch (ovs, ivs, user) |
| \`--controller\` | Controller type + địa chỉ |
| \`--link\` | Link params (tc, default) |
| \`--test\` | Auto test rồi thoát |
| \`--mac\` | Đặt MAC đơn giản |
| \`-x\` | Mở xterm cho mỗi node |
| \`-c\` | Dọn dẹp |
` },
    ],
    quiz:[
      { id:'q3-1', q:'Lệnh kiểm tra kết nối TOÀN BỘ hosts trong CLI?', opts:['ping','pingall','net','dump'], ans:1, exp:"'pingall' ping giữa tất cả cặp hosts. Ví dụ: 4 hosts → 12 ping pairs." },
      { id:'q3-2', q:'Cú pháp thực thi lệnh ifconfig trên host h1?', opts:['ifconfig h1','h1: ifconfig','h1 ifconfig','run h1 ifconfig'], ans:2, exp:"Cú pháp Mininet CLI: '<hostname> <command>'. Ví dụ: 'h1 ifconfig', 'h2 ping -c 3 h3'." },
      { id:'q3-3', q:'Xem flow table của switch s1 bằng lệnh?', opts:['dump s1','s1 show-flows','sh ovs-ofctl dump-flows s1','flows s1'], ans:2, exp:"'sh <command>' cho phép chạy shell command. 'ovs-ofctl dump-flows s1' hiển thị flow entries của s1." },
    ],
    exercises:[
      { id:'ex3-1', title:'Khám phá CLI topology', diff:'easy', desc:'Khởi động Mininet linear,4. Chạy: nodes, net, dump, links. Giải thích từng output.', code:`$ sudo mn --topo linear,4\nmininet> nodes\nmininet> net\nmininet> dump\nmininet> links` },
      { id:'ex3-2', title:'Web server trong Mininet', diff:'medium', desc:'Chạy Python web server trên h1 (port 8080), truy cập từ h2 bằng curl. Đo thời gian response.', code:`mininet> xterm h1 h2\n# Trong xterm h1:\npython3 -m http.server 8080 &\n# Trong xterm h2:\ncurl -v http://10.0.0.1:8080\ntime curl http://10.0.0.1:8080` },
      { id:'ex3-3', title:'Phân tích flow table', diff:'medium', desc:'Dump flow table trước và sau khi pingall. So sánh sự thay đổi. Giải thích các flow entries mới.', code:`mininet> sh ovs-ofctl dump-flows s1\nmininet> h1 ping -c 1 h2\nmininet> sh ovs-ofctl dump-flows s1\n# So sánh 2 output` },
    ]
  },
  {
    id:'c4', n:4, icon:'', color:'#c792ea', diff:'intermediate', time:'4 giờ',
    title:'Xây dựng Topology Mạng',
    sections:[
      { id:'s4-1', title:'Topology có sẵn', md:`
## Built-in Topologies

| Topology | Lệnh | Mô tả |
|----------|------|-------|
| **Minimal** | \`sudo mn\` | 1 switch, 2 hosts |
| **Single** | \`--topo single,N\` | 1 switch, N hosts |
| **Linear** | \`--topo linear,N\` | N switches nối tiếp |
| **Tree** | \`--topo tree,d,f\` | Cây depth=d, fanout=f |
| **Torus** | \`--topo torus,x,y\` | Lưới xoắn x×y |

### Ví dụ tính số nodes

\`\`\`
Tree depth=3, fanout=2:
- Level 0: 1 root switch
- Level 1: 2 switches
- Level 2: 4 switches
- Hosts: 4 × 2 = 8 hosts
Tổng: 7 switches + 8 hosts
\`\`\`
` },
      { id:'s4-2', title:'Python API Custom Topology', md:`
## Custom Topology với Python

\`\`\`python
#!/usr/bin/env python3
from mininet.net import Mininet
from mininet.node import Controller, OVSSwitch
from mininet.link import TCLink
from mininet.log import setLogLevel, info
from mininet.cli import CLI

def create_topo():
    net = Mininet(
        controller=Controller,
        switch=OVSSwitch,
        link=TCLink,
        autoSetMacs=True
    )
    
    info('*** Adding controller\\n')
    c0 = net.addController('c0')
    
    info('*** Adding switches\\n')
    s1 = net.addSwitch('s1')
    s2 = net.addSwitch('s2')
    
    info('*** Adding hosts\\n')
    h1 = net.addHost('h1', ip='10.0.1.1/24')
    h2 = net.addHost('h2', ip='10.0.1.2/24')
    h3 = net.addHost('h3', ip='10.0.2.1/24')
    h4 = net.addHost('h4', ip='10.0.2.2/24')
    
    info('*** Adding links\\n')
    # Link với TCLink params
    net.addLink(h1, s1, bw=100, delay='2ms')
    net.addLink(h2, s1, bw=100, delay='2ms')
    net.addLink(h3, s2, bw=100, delay='2ms')
    net.addLink(h4, s2, bw=100, delay='2ms')
    net.addLink(s1, s2, bw=1000, delay='1ms')
    
    net.start()
    CLI(net)
    net.stop()

if __name__ == '__main__':
    setLogLevel('info')
    create_topo()
\`\`\`
` },
      { id:'s4-3', title:'Fat Tree Topology', md:`
## Fat Tree — Topology Data Center

Fat Tree k=4: (k/2)² = 4 core, k²/2 = 8 agg, k²/2 = 8 edge, k³/4 = 16 hosts

\`\`\`python
#!/usr/bin/env python3
from mininet.net import Mininet
from mininet.node import Controller, OVSSwitch
from mininet.link import TCLink
from mininet.cli import CLI

def fat_tree(k=4):
    net = Mininet(controller=Controller,
                  switch=OVSSwitch, link=TCLink, autoSetMacs=True)
    net.addController('c0')
    
    # Core switches: (k/2)^2
    cores = [net.addSwitch(f'cs{i+1}') for i in range((k//2)**2)]
    
    host_id = 1
    for pod in range(k):
        # Aggregation switches
        aggs = [net.addSwitch(f'ag{pod}{i}') for i in range(k//2)]
        for i, agg in enumerate(aggs):
            for j in range(k//2):
                net.addLink(agg, cores[i*(k//2)+j], bw=10000)
        
        # Edge switches
        for i in range(k//2):
            edge = net.addSwitch(f'ed{pod}{i}')
            for agg in aggs:
                net.addLink(edge, agg, bw=1000)
            for j in range(k//2):
                h = net.addHost(f'h{host_id}',
                    ip=f'10.{pod}.{i}.{j+2}/24')
                net.addLink(h, edge, bw=100)
                host_id += 1
    
    net.start()
    CLI(net)
    net.stop()

if __name__ == '__main__':
    fat_tree(k=4)
\`\`\`
` },
      { id:'s4-4', title:'TCLink Parameters', md:`
## Cấu hình Link với TCLink

| Tham số | Đơn vị | Mô tả | Ví dụ |
|---------|--------|-------|-------|
| \`bw\` | Mbps | Bandwidth | \`bw=100\` |
| \`delay\` | ms/us/s | One-way delay | \`delay='5ms'\` |
| \`loss\` | % | Packet loss rate | \`loss=1\` |
| \`max_queue_size\` | packets | Buffer size | \`max_queue_size=1000\` |
| \`jitter\` | ms | Delay variation | \`jitter='2ms'\` |

\`\`\`python
# WAN link mô phỏng
net.addLink(s1, s2,
    bw=1,           # 1 Mbps (đường ADSL cũ)
    delay='50ms',   # Xuyên lục địa
    loss=0.5,       # 0.5% mất gói
    max_queue_size=100
)

# LAN Gigabit
net.addLink(s1, s2,
    bw=1000,        # 1 Gbps
    delay='0.1ms',  # Trong data center
    loss=0
)
\`\`\`
` },
    ],
    quiz:[
      { id:'q4-1', q:'Fat Tree k=4 có bao nhiêu core switches?', opts:['2','4','8','16'], ans:1, exp:'Core switches = (k/2)² = (4/2)² = 4. Công thức tổng quát cho k bất kỳ.' },
      { id:'q4-2', q:'Tham số TCLink nào đặt tỷ lệ mất gói?', opts:['drop','loss','packet_loss','pl'], ans:1, exp:"Tham số 'loss' đặt phần trăm mất gói. Ví dụ: loss=1 → 1% packet loss." },
      { id:'q4-3', q:'Tree topology depth=2, fanout=3 có bao nhiêu hosts?', opts:['6','9','12','3'], ans:1, exp:'Fanout=3 switches ở level 1, mỗi switch có 3 hosts → 3×3=9 hosts.' },
    ],
    exercises:[
      { id:'ex4-1', title:'Ring Topology', diff:'medium', desc:'Tạo topology ring: 6 switch nối vòng, mỗi switch 1 host. Kiểm tra ping RTT.', code:`# ring_topo.py\nfrom mininet.net import Mininet\nfrom mininet.node import Controller, OVSSwitch\nfrom mininet.cli import CLI\n\ndef ring():\n    net = Mininet(controller=Controller, switch=OVSSwitch)\n    net.addController('c0')\n    sws = [net.addSwitch(f's{i}') for i in range(1,7)]\n    hosts = [net.addHost(f'h{i}',ip=f'10.0.0.{i}/24') for i in range(1,7)]\n    for i in range(6):\n        net.addLink(hosts[i], sws[i])\n        net.addLink(sws[i], sws[(i+1)%6])\n    net.start(); CLI(net); net.stop()\nring()` },
      { id:'ex4-2', title:'2-tier Data Center', diff:'hard', desc:'2 core switch kết nối 4 edge switch, mỗi edge 3 host. Đo bisection bandwidth.'},
      { id:'ex4-3', title:'Fat Tree k=4', diff:'hard', desc:'Implement Fat Tree k=4. Đo bandwidth giữa hosts ở các pod khác nhau.'},
    ]
  },
  {
    id:'c5', n:5, icon:'', color:'#00d4ff', diff:'intermediate', time:'4 giờ',
    title:'Python API — Lập trình Mininet',
    sections:[
      { id:'s5-1', title:'API Reference', md:`
## Classes chính

| Class | Module | Mô tả |
|-------|--------|-------|
| \`Mininet\` | \`mininet.net\` | Quản lý toàn bộ mạng |
| \`Topo\` | \`mininet.topo\` | Base topology class |
| \`Host\` | \`mininet.node\` | Host node |
| \`OVSSwitch\` | \`mininet.node\` | Open vSwitch |
| \`Controller\` | \`mininet.node\` | Local controller |
| \`RemoteController\` | \`mininet.node\` | External controller |
| \`TCLink\` | \`mininet.link\` | Link với traffic control |
| \`CLI\` | \`mininet.cli\` | Interactive CLI |

\`\`\`python
# Import cơ bản
from mininet.net import Mininet
from mininet.node import Controller, OVSSwitch, RemoteController
from mininet.link import TCLink, Link
from mininet.topo import Topo
from mininet.log import setLogLevel, info
from mininet.cli import CLI
\`\`\`
` },
      { id:'s5-2', title:'Custom Topo Class', md:`
## Topo Class Pattern

\`\`\`python
from mininet.topo import Topo
from mininet.net import Mininet
from mininet.link import TCLink

class DataCenterTopo(Topo):
    """Data center topology: core-edge-hosts"""
    
    def build(self, n_edge=3, hosts_per_edge=3,
              core_bw=1000, edge_bw=100, host_bw=10):
        # Core switch
        core = self.addSwitch('core1')
        
        for i in range(n_edge):
            # Edge switch
            edge = self.addSwitch(f'edge{i+1}')
            self.addLink(edge, core,
                bw=core_bw, delay='1ms')
            
            # Hosts per edge
            for j in range(hosts_per_edge):
                h = self.addHost(
                    f'h{i*hosts_per_edge + j + 1}',
                    ip=f'192.168.{i+1}.{j+1}/24'
                )
                self.addLink(h, edge,
                    bw=edge_bw, delay='2ms')

# Khởi tạo với tham số tuỳ chỉnh
topo = DataCenterTopo(n_edge=4, hosts_per_edge=3)
net = Mininet(topo=topo, link=TCLink, autoSetMacs=True)
net.start()
CLI(net)
net.stop()
\`\`\`
` },
      { id:'s5-3', title:'Tự động hóa thí nghiệm', md:`
## Script đo hiệu suất tự động

\`\`\`python
#!/usr/bin/env python3
import time, csv
from mininet.net import Mininet
from mininet.topo import SingleSwitchTopo
from mininet.log import setLogLevel

def run_experiment(bw_list=[100,50,10], delay_list=['1ms','10ms','50ms']):
    results = []
    
    for bw in bw_list:
        for delay in delay_list:
            print(f'\\n>>> Test: bw={bw}Mbps delay={delay}')
            
            net = Mininet(
                topo=SingleSwitchTopo(n=2),
                autoSetMacs=True
            )
            net.start()
            
            # Set link params dynamically
            for link in net.links:
                link.intf1.config(bw=bw, delay=delay)
                link.intf2.config(bw=bw, delay=delay)
            
            time.sleep(2)
            h1, h2 = net.get('h1', 'h2')
            
            # Đo RTT
            ping_out = h1.cmd(f'ping -c 10 -q {h2.IP()}')
            rtt = 'N/A'
            for line in ping_out.split('\\n'):
                if 'rtt min' in line:
                    rtt = line.split('=')[1].split('/')[1].strip() + 'ms'
            
            # Đo bandwidth
            h2.cmd('iperf3 -s &')
            time.sleep(0.5)
            iperf_out = h1.cmd(f'iperf3 -c {h2.IP()} -t 5')
            actual_bw = 'N/A'
            for line in iperf_out.split('\\n'):
                if 'sender' in line:
                    parts = line.split()
                    actual_bw = f'{parts[-3]} {parts[-2]}'
            
            results.append({
                'bw_config': bw, 'delay_config': delay,
                'avg_rtt': rtt, 'actual_bw': actual_bw
            })
            net.stop()
            time.sleep(1)
    
    # Xuất CSV
    with open('results.csv', 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=results[0].keys())
        w.writeheader(); w.writerows(results)
    print('\\n✓ Kết quả lưu vào results.csv')
    return results

if __name__ == '__main__':
    setLogLevel('warning')
    run_experiment()
\`\`\`
` },
    ],
    quiz:[
      { id:'q5-1', q:'Method thực thi lệnh shell trên host trong Python API?', opts:['host.run()','host.exec()','host.cmd()','host.sh()'], ans:2, exp:"host.cmd('command') thực thi shell command và trả về output string. Ví dụ: h1.cmd('ping -c 3 10.0.0.2')" },
      { id:'q5-2', q:'Để tạo custom topology class, ta kế thừa class nào?', opts:['Mininet','Network','Topo','Topology'], ans:2, exp:"Kế thừa class 'Topo' từ mininet.topo và override method build(**opts)." },
    ],
    exercises:[
      { id:'ex5-1', title:'RTT Matrix tự động', diff:'medium', desc:'Script đo RTT giữa tất cả cặp hosts trong topology, xuất ma trận ra CSV.', code:`from itertools import combinations\nimport csv\n\ndef rtt_matrix(net):\n    results = []\n    for h1, h2 in combinations(net.hosts, 2):\n        out = h1.cmd(f'ping -c 5 -q {h2.IP()}')\n        for l in out.split('\\n'):\n            if 'rtt min' in l:\n                v = l.split('=')[1].split('/')\n                results.append({'src':h1.name,'dst':h2.name,\n                    'min':v[0].strip(),'avg':v[1].strip()})\n    return results` },
      { id:'ex5-2', title:'Bandwidth Matrix', diff:'hard', desc:'Đo iperf3 bandwidth giữa tất cả cặp hosts, tạo heatmap bằng matplotlib.' },
    ]
  },
  {
    id:'c6', n:6, icon:'', color:'#ff5370', diff:'intermediate', time:'5 giờ',
    title:'OpenFlow & SDN Controller',
    sections:[
      { id:'s6-1', title:'Kết nối Controller', md:`
## Remote Controller Integration

\`\`\`bash
# Khởi động Mininet với remote controller
$ sudo mn \\
    --controller=remote,ip=127.0.0.1,port=6653 \\
    --topo single,3 \\
    --switch ovs,protocols=OpenFlow13
\`\`\`

\`\`\`python
# Trong Python API
from mininet.node import RemoteController

net = Mininet(controller=RemoteController)
c0 = net.addController('c0',
    controller=RemoteController,
    ip='127.0.0.1',
    port=6653
)
\`\`\`

### Thứ tự khởi động

1. **Khởi động Controller trước** (Ryu/ONOS/ODL)
2. **Khởi động Mininet** → Switch gửi HELLO
3. **Controller xử lý** EventOFPSwitchFeatures
4. **Cài table-miss flow** → Packet-In khi unknown packet
5. **Learning/forwarding** qua Packet-In/Packet-Out
` },
      { id:'s6-2', title:'Ryu L2 Learning Switch', md:`
## Ryu App — L2 Learning Switch (OpenFlow 1.3)

\`\`\`python
#!/usr/bin/env python3
from ryu.base import app_manager
from ryu.controller import ofp_event
from ryu.controller.handler import (CONFIG_DISPATCHER,
    MAIN_DISPATCHER, set_ev_cls)
from ryu.ofproto import ofproto_v1_3
from ryu.lib.packet import packet, ethernet, ether_types

class L2Switch(app_manager.RyuApp):
    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.mac_to_port = {}  # {dpid: {mac: port}}

    @set_ev_cls(ofp_event.EventOFPSwitchFeatures,
                CONFIG_DISPATCHER)
    def switch_features_handler(self, ev):
        """Cài table-miss flow khi switch kết nối"""
        dp = ev.msg.datapath
        ofp = dp.ofproto
        parser = dp.ofproto_parser
        # Match all, priority 0 → send to controller
        match = parser.OFPMatch()
        actions = [parser.OFPActionOutput(
            ofp.OFPP_CONTROLLER, ofp.OFPCML_NO_BUFFER)]
        self._add_flow(dp, 0, match, actions)

    def _add_flow(self, dp, priority, match, actions,
                   idle=0, hard=0):
        ofp = dp.ofproto
        parser = dp.ofproto_parser
        inst = [parser.OFPInstructionActions(
            ofp.OFPIT_APPLY_ACTIONS, actions)]
        mod = parser.OFPFlowMod(
            datapath=dp, priority=priority,
            match=match, instructions=inst,
            idle_timeout=idle, hard_timeout=hard)
        dp.send_msg(mod)

    @set_ev_cls(ofp_event.EventOFPPacketIn,
                MAIN_DISPATCHER)
    def packet_in_handler(self, ev):
        msg = ev.msg
        dp = msg.datapath
        ofp = dp.ofproto
        parser = dp.ofproto_parser
        in_port = msg.match['in_port']

        pkt = packet.Packet(msg.data)
        eth = pkt.get_protocols(ethernet.ethernet)[0]
        if eth.ethertype == ether_types.ETH_TYPE_LLDP:
            return  # Ignore LLDP

        dst, src, dpid = eth.dst, eth.src, dp.id
        self.mac_to_port.setdefault(dpid, {})
        self.mac_to_port[dpid][src] = in_port  # ← Learning

        # Lookup destination
        if dst in self.mac_to_port[dpid]:
            out_port = self.mac_to_port[dpid][dst]
        else:
            out_port = ofp.OFPP_FLOOD

        actions = [parser.OFPActionOutput(out_port)]

        # Cài flow rule nếu biết đích
        if out_port != ofp.OFPP_FLOOD:
            match = parser.OFPMatch(
                in_port=in_port, eth_dst=dst, eth_src=src)
            self._add_flow(dp, 1, match, actions,
                          idle=30, hard=0)

        # Gửi packet
        data = msg.data if msg.buffer_id == ofp.OFP_NO_BUFFER else None
        out = parser.OFPPacketOut(
            datapath=dp, buffer_id=msg.buffer_id,
            in_port=in_port, actions=actions, data=data)
        dp.send_msg(out)
\`\`\`
` },
      { id:'s6-3', title:'Flow Rules & REST API', md:`
## Flow Rules thủ công

\`\`\`bash
# Forward: port 1 → port 2
$ sudo ovs-ofctl add-flow s1 'in_port=1,actions=output:2'

# Match theo IP đích
$ sudo ovs-ofctl add-flow s1 \\
    'ip,nw_dst=10.0.0.2,actions=output:2'

# Chặn traffic (drop)
$ sudo ovs-ofctl add-flow s1 \\
    'priority=200,ip,nw_src=10.0.0.99,actions=drop'

# Xem flows
$ sudo ovs-ofctl dump-flows s1

# Xóa flows
$ sudo ovs-ofctl del-flows s1
\`\`\`

## Ryu REST API

\`\`\`bash
# Chạy Ryu với REST API
$ ryu-manager ryu.app.simple_switch_13 ryu.app.ofctl_rest
\`\`\`

\`\`\`python
import requests

RYU = 'http://localhost:8080'

# Lấy thống kê flows
r = requests.get(f'{RYU}/stats/flow/1')
flows = r.json()

# Thêm flow rule
flow = {
    'dpid': 1, 'priority': 100,
    'match': {'eth_type': 2048, 'ipv4_src': '10.0.0.99'},
    'actions': []  # Drop
}
requests.post(f'{RYU}/stats/flowentry/add', json=flow)
\`\`\`
` },
    ],
    quiz:[
      { id:'q6-1', q:'Khi packet không khớp flow rule nào, điều gì xảy ra với table-miss flow?', opts:['Tự động drop','Flood ra tất cả ports','Gửi Packet-In lên controller','Gửi về sender'], ans:2, exp:'Table-miss flow (priority=0, match=all) với action=OFPP_CONTROLLER gửi Packet-In lên controller để xử lý.' },
      { id:'q6-2', q:'Port mặc định Ryu controller lắng nghe OpenFlow 1.3?', opts:['6633','6653','8080','9090'], ans:1, exp:'Port 6653 là port chuẩn IANA cho OpenFlow từ v1.1. Port 6633 là port cũ (v1.0).' },
    ],
    exercises:[
      { id:'ex6-1', title:'SDN Firewall', diff:'hard', desc:'Ryu app: chặn traffic h1→h3, cho phép mọi kết nối khác. Test bằng ping và netcat.'},
      { id:'ex6-2', title:'Round-robin Load Balancer', diff:'hard', desc:'Controller phân phối traffic từ client đến server1 và server2 theo round-robin.'},
    ]
  },
  {
    id:'c7', n:7, icon:'', color:'#00e676', diff:'intermediate', time:'3 giờ',
    title:'Kiểm tra Hiệu suất Mạng',
    sections:[
      { id:'s7-1', title:'Công cụ đo hiệu suất', md:`
## Bộ công cụ đo lường

| Công cụ | Đo | Giao thức |
|---------|-----|---------|
| **iperf3** | Bandwidth, Jitter | TCP/UDP |
| **ping** | RTT, Packet Loss | ICMP |
| **hping3** | Advanced testing | TCP/UDP/ICMP |
| **netperf** | Throughput, Latency | TCP/UDP |
| **tc** | QoS, traffic shaping | Kernel |
| **bwm-ng** | Real-time monitoring | Interface |
| **tcpdump** | Packet capture | Tất cả |

\`\`\`bash
$ sudo apt-get install iperf3 hping3 bwm-ng netperf -y
\`\`\`
` },
      { id:'s7-2', title:'iperf3 Bandwidth Test', md:`
## iperf3 — Đo Bandwidth

\`\`\`bash
# Server trên h1
mininet> h1 iperf3 -s &

# TCP test 30 giây, report mỗi 5s
mininet> h2 iperf3 -c 10.0.0.1 -t 30 -i 5

# UDP test với target 100Mbps
mininet> h2 iperf3 -c 10.0.0.1 -u -b 100M -t 30

# 4 luồng song song
mininet> h2 iperf3 -c 10.0.0.1 -P 4 -t 30

# Reverse (server→client)
mininet> h2 iperf3 -c 10.0.0.1 -R -t 30

# JSON output
mininet> h2 iperf3 -c 10.0.0.1 -J > result.json
\`\`\`

### Kết quả mẫu

\`\`\`
[ ID] Interval     Transfer    Bitrate
[  5] 0.00-5.00s   590 MBytes  991 Mbits/sec
[  5] 5.00-10.00s  594 MBytes  997 Mbits/sec
[  5] 0.00-30.00s  3.57 GBytes 1023 Mbits/sec  sender
\`\`\`
` },
      { id:'s7-3', title:'Script đo tự động', md:`
## Script đo hệ thống tự động

\`\`\`python
#!/usr/bin/env python3
from mininet.net import Mininet
from mininet.node import OVSSwitch, Controller
from mininet.link import TCLink
import time, csv, json

def measure_performance(net, pairs=None):
    """Đo bandwidth và RTT giữa các cặp host"""
    if pairs is None:
        from itertools import combinations
        pairs = list(combinations(net.hosts, 2))
    
    results = []
    for src, dst in pairs:
        # Đo RTT
        ping = src.cmd(f'ping -c 20 -q {dst.IP()}')
        rtt_data = {'min':'N/A','avg':'N/A','max':'N/A'}
        for line in ping.split('\\n'):
            if 'rtt min' in line:
                v = line.split('=')[1].split('/')
                rtt_data = {
                    'min': v[0].strip(),
                    'avg': v[1].strip(),
                    'max': v[2].split('ms')[0].strip()
                }
        
        # Đo bandwidth
        dst.cmd('pkill iperf3; iperf3 -s &')
        time.sleep(0.5)
        iperf = src.cmd(f'iperf3 -c {dst.IP()} -t 10 -J')
        bw = 'N/A'
        try:
            data = json.loads(iperf)
            bps = data['end']['sum_sent']['bits_per_second']
            bw = f'{bps/1e6:.1f} Mbps'
        except:
            pass
        
        results.append({
            'src': src.name, 'dst': dst.name,
            'rtt_min': rtt_data['min'],
            'rtt_avg': rtt_data['avg'],
            'bandwidth': bw
        })
        print(f"  {src.name}→{dst.name}: RTT={rtt_data['avg']}ms BW={bw}")
    
    return results
\`\`\`
` },
    ],
    quiz:[
      { id:'q7-1', q:'Flag iperf3 để test UDP với target 100Mbps?', opts:['iperf3 -c h -u 100M','iperf3 -c h -u -b 100M','iperf3 -c h --udp 100','iperf3 -c h -U 100M'], ans:1, exp:"-u chỉ định UDP mode, -b đặt target bandwidth. Thiếu -u thì mặc định là TCP." },
      { id:'q7-2', q:'ping flag nào để chỉ định số gói?', opts:['-t','-n','-c','-s'], ans:2, exp:"-c (count) chỉ định số gói ping. Ví dụ: ping -c 10 → gửi 10 gói." },
    ],
    exercises:[
      { id:'ex7-1', title:'TCP throughput vs Latency', diff:'medium', desc:'Đo TCP throughput với delay=1,10,50,100ms. Giải thích tại sao throughput giảm khi latency tăng (bandwidth-delay product).'},
      { id:'ex7-2', title:'Packet loss analysis', diff:'hard', desc:'Đo TCP throughput với loss=0,0.1,0.5,1,2%. Vẽ đồ thị và tính TCP throughput theo công thức Mathis.'},
    ]
  },
  {
    id:'c8', n:8, icon:'', color:'#ffcb6b', diff:'advanced', time:'5 giờ',
    title:'ONOS & OpenDaylight',
    sections:[
      { id:'s8-1', title:'ONOS Controller', md:`
## ONOS — Open Network Operating System

ONOS là SDN Controller enterprise-grade, carrier-grade, phát triển bởi ONF.

### Cài đặt với Docker

\`\`\`bash
# Pull ONOS image
$ sudo docker pull onosproject/onos:2.7

# Chạy ONOS
$ sudo docker run -d --name onos \\
    -p 6653:6653 \\
    -p 8181:8181 \\
    -p 8101:8101 \\
    onosproject/onos:2.7

# Kết nối Mininet
$ sudo mn \\
    --controller=remote,ip=127.0.0.1,port=6653 \\
    --switch ovs,protocols=OpenFlow13 \\
    --topo single,5
\`\`\`

### Kích hoạt ONOS Apps

\`\`\`bash
# SSH vào ONOS CLI
$ ssh -p 8101 karaf@localhost  # pass: karaf

onos> app activate org.onosproject.openflow
onos> app activate org.onosproject.fwd
onos> app activate org.onosproject.gui2

# Web UI: http://localhost:8181/onos/ui
# user: onos | pass: rocks
\`\`\`
` },
      { id:'s8-2', title:'OpenDaylight', md:`
## OpenDaylight (ODL)

ODL là SDN Controller enterprise lớn nhất, phát triển bởi Linux Foundation.

### Cài đặt ODL Phosphorus

\`\`\`bash
# Yêu cầu Java 11
$ sudo apt-get install openjdk-11-jdk -y
$ export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64

# Tải ODL
$ wget https://nexus.opendaylight.org/content/repositories/\\
opendaylight.release/org/opendaylight/integration/karaf/\\
0.16.2/karaf-0.16.2.tar.gz
$ tar xzf karaf-0.16.2.tar.gz
$ cd karaf-0.16.2/bin && ./karaf

# Trong ODL CLI
opendaylight-user> feature:install odl-restconf odl-l2switch-switch odl-dlux-core

# Kết nối Mininet (port 6633 cho ODL)
$ sudo mn --controller=remote,ip=127.0.0.1,port=6633 \\
          --switch ovs,protocols=OpenFlow13 \\
          --topo tree,2,3
\`\`\`
` },
      { id:'s8-3', title:'REST API Management', md:`
## Quản lý qua REST API

### ONOS REST API

\`\`\`python
import requests
from requests.auth import HTTPBasicAuth

ONOS = 'http://localhost:8181/onos/v1'
AUTH = HTTPBasicAuth('onos', 'rocks')

# Lấy danh sách switches
r = requests.get(f'{ONOS}/devices', auth=AUTH)
for d in r.json().get('devices',[]):
    print(f"{d['id']} - {d['type']} - {d['available']}")

# Lấy hosts
r = requests.get(f'{ONOS}/hosts', auth=AUTH)

# Tạo host-to-host intent
intent = {
    'type': 'HostToHostIntent',
    'appId': 'org.onosproject.cli',
    'one': '00:00:00:00:00:01/None',
    'two': '00:00:00:00:00:02/None'
}
r = requests.post(f'{ONOS}/intents', json=intent, auth=AUTH)
print(r.status_code)
\`\`\`

### ODL RESTCONF API

\`\`\`bash
# Lấy topology
$ curl -u admin:admin \\
  http://localhost:8080/restconf/operational/\\
  network-topology:network-topology/ | python3 -m json.tool

# Thêm flow rule
$ curl -u admin:admin -X PUT \\
  -H 'Content-Type: application/json' \\
  -d '{"flow":[{"id":"1","priority":100,...}]}' \\
  http://localhost:8080/restconf/config/opendaylight-inventory:nodes/...
\`\`\`
` },
    ],
    quiz:[
      { id:'q8-1', q:'ONOS Web UI chạy trên port nào?', opts:['8080','6653','8181','9090'], ans:2, exp:'ONOS Web UI (Karaf) chạy trên port 8181. REST API cũng dùng port này. SSH CLI dùng port 8101.' },
      { id:'q8-2', q:'ODL kết nối OpenFlow theo port mặc định?', opts:['6653','6633','8080','8181'], ans:1, exp:'OpenDaylight dùng port 6633 (OpenFlow legacy). Mininet cần --controller=remote,port=6633 khi dùng ODL.' },
    ],
    exercises:[
      { id:'ex8-1', title:'ONOS với Docker Compose', diff:'hard', desc:'Viết docker-compose.yml chạy ONOS + Ryu, kết nối Mininet tree,2,3 và visualize topology qua ONOS GUI.'},
    ]
  },
  {
    id:'c9', n:9, icon:'', color:'#c792ea', diff:'advanced', time:'6 giờ',
    title:'Kịch bản Nâng cao',
    sections:[
      { id:'s9-1', title:'Network Slicing', md:`
## Network Slicing với VLAN

\`\`\`python
#!/usr/bin/env python3
from mininet.net import Mininet
from mininet.node import OVSSwitch, Controller
from mininet.link import TCLink
from mininet.cli import CLI

def network_slicing():
    net = Mininet(switch=OVSSwitch,
                  controller=Controller, link=TCLink)
    net.addController('c0')
    s1 = net.addSwitch('s1')

    # Slice 1: Tenant A (VLAN 100)
    h1a = net.addHost('h1a', ip='192.168.1.1/24')
    h2a = net.addHost('h2a', ip='192.168.1.2/24')
    
    # Slice 2: Tenant B (VLAN 200)
    h1b = net.addHost('h1b', ip='192.168.1.1/24')
    h2b = net.addHost('h2b', ip='192.168.1.2/24')

    net.addLink(h1a, s1)
    net.addLink(h2a, s1)
    net.addLink(h1b, s1)
    net.addLink(h2b, s1)
    net.start()

    # Gán VLAN tags
    s1.cmd('ovs-vsctl set port s1-eth1 tag=100')
    s1.cmd('ovs-vsctl set port s1-eth2 tag=100')
    s1.cmd('ovs-vsctl set port s1-eth3 tag=200')
    s1.cmd('ovs-vsctl set port s1-eth4 tag=200')

    print("Tenant A (VLAN 100): h1a ↔ h2a ✓")
    print("Tenant B (VLAN 200): h1b ↔ h2b ✓")
    print("Cross-tenant: blocked ✓")
    
    CLI(net)
    net.stop()
\`\`\`
` },
      { id:'s9-2', title:'Link Failure & Failover', md:`
## Mô phỏng Link Failure

\`\`\`python
import time
from mininet.cli import CLI

def test_failover(net):
    s1, s2, s3 = net.get('s1','s2','s3')
    h1, h2 = net.get('h1','h2')
    
    # Topology: h1-s1-s2-h2 (primary)
    #                s1-s3-s2    (backup)
    
    print('\\n=== Before failure ===')
    result = h1.cmd(f'ping -c 3 {h2.IP()}')
    print(result)
    
    # Ngắt link chính s1-s2
    print('\\n=== Breaking primary link s1-s2 ===')
    link = net.linksBetween(s1, s2)[0]
    link.intf1.ifconfig('down')
    link.intf2.ifconfig('down')
    time.sleep(3)  # Chờ controller re-route
    
    print('=== Testing reroute via s3 ===')
    result = h1.cmd(f'ping -c 5 {h2.IP()}')
    print(result)
    
    # Khôi phục
    print('\\n=== Restoring link ===')
    link.intf1.ifconfig('up')
    link.intf2.ifconfig('up')
    time.sleep(2)
    h1.cmd(f'ping -c 3 {h2.IP()}')

def failover_topo():
    from mininet.net import Mininet
    from mininet.node import OVSSwitch, RemoteController
    net = Mininet(switch=OVSSwitch,
        controller=RemoteController)
    net.addController('c0', ip='127.0.0.1', port=6653)
    s1, s2, s3 = [net.addSwitch(f's{i}') for i in range(1,4)]
    h1 = net.addHost('h1', ip='10.0.0.1/24')
    h2 = net.addHost('h2', ip='10.0.0.2/24')
    net.addLink(h1, s1)
    net.addLink(s1, s2, bw=100)  # Primary path
    net.addLink(s1, s3, bw=50)   # Backup path
    net.addLink(s3, s2, bw=50)
    net.addLink(s2, h2)
    net.start()
    test_failover(net)
    net.stop()
\`\`\`
` },
      { id:'s9-3', title:'ECMP Multipath', md:`
## ECMP — Equal Cost Multi-Path Routing

\`\`\`python
def ecmp_topo():
    from mininet.net import Mininet
    from mininet.node import OVSSwitch, RemoteController
    from mininet.link import TCLink
    
    net = Mininet(switch=OVSSwitch, link=TCLink,
                  controller=RemoteController)
    net.addController('c0', ip='127.0.0.1', port=6653)
    
    # Ingress và Egress switch
    s_in = net.addSwitch('s_in')
    s_out = net.addSwitch('s_out')
    
    # 3 đường song song
    middles = [net.addSwitch(f'm{i}') for i in range(1,4)]
    
    src = net.addHost('src', ip='10.0.0.1/24')
    dst = net.addHost('dst', ip='10.0.0.10/24')
    
    net.addLink(src, s_in)
    for m in middles:
        net.addLink(s_in, m, bw=100)
        net.addLink(m, s_out, bw=100)
    net.addLink(s_out, dst)
    
    net.start()
    # ECMP cài bởi Ryu ECMP app
    CLI(net)
    net.stop()
\`\`\`

### Kiểm tra ECMP

\`\`\`bash
# Đo bandwidth tổng hợp (nên ~ 300Mbps = 3×100)
mininet> h1 iperf3 -c 10.0.0.10 -P 8 -t 30
\`\`\`
` },
    ],
    quiz:[
      { id:'q9-1', q:'Network Slicing dùng VLAN để làm gì?', opts:['Tăng bandwidth','Cô lập traffic giữa các tenant trên hạ tầng chung','Mã hóa dữ liệu','Giảm latency'], ans:1, exp:'VLAN tags cô lập traffic của từng tenant hoàn toàn, nhiều tenant dùng cùng switch nhưng không thấy packet của nhau.' },
      { id:'q9-2', q:'ECMP phân phối traffic như thế nào?', opts:['Random','Theo IP src hash','Theo volume','Theo thứ tự port'], ans:1, exp:'ECMP thường dùng hash 5-tuple (src/dst IP, src/dst port, protocol) để chọn đường, đảm bảo cùng flow đi cùng đường.' },
    ],
    exercises:[
      { id:'ex9-1', title:'Multi-tenant Network', diff:'hard', desc:'3 tenant với VLAN 10/20/30. Verify: intra-tenant OK, cross-tenant blocked. QoS: tenant 1 ưu tiên cao nhất.'},
      { id:'ex9-2', title:'SDN DDoS Detection', diff:'hard', desc:'Phát hiện DDoS: controller monitor flow stats, tự động block IP khi có > 500 pkt/s từ cùng nguồn.'},
    ]
  },
  {
    id:'c10', n:10, icon:'', color:'#ff9800', diff:'advanced', time:'8 giờ',
    title:'Dự án Thực tế & Đề thi',
    sections:[
      { id:'s10-1', title:'Dự án: Campus Network', md:`
## Dự án 1 — SDN Campus Network

### Mô tả hệ thống

Mạng campus university với SDN controller quản lý toàn bộ.

**Cấu trúc:**
- 3 tòa nhà (A/B/C), mỗi tòa 3 tầng, mỗi tầng 10 hosts
- Core: 2 switch (redundant), Aggregation: 6, Edge: 9
- Tổng: ~90 hosts

**VLAN phân loại:**
- VLAN 10: Academic (giảng viên/sinh viên)
- VLAN 20: Admin (hành chính)
- VLAN 30: Guest (khách)

**Yêu cầu kỹ thuật:**
- QoS: Academic > Admin > Guest
- Link failover < 3 giây
- Monitoring dashboard real-time
- REST API để quản lý từ xa

### Cấu trúc dự án

\`\`\`
campus-sdn/
├── topology/
│   ├── campus_topo.py    # Topology definition
│   └── hosts.csv         # Host configuration
├── controller/
│   ├── main_ctrl.py      # Ryu controller chính
│   ├── qos_manager.py    # QoS policies
│   ├── vlan_manager.py   # VLAN management
│   └── failover.py       # Link failure handler
├── monitoring/
│   ├── collector.py      # Stats collector
│   └── dashboard.py      # Flask dashboard
├── tests/
│   ├── test_connectivity.py
│   ├── test_qos.py
│   └── test_failover.py
├── README.md
└── requirements.txt
\`\`\`

### Rubric chấm điểm

| Tiêu chí | Điểm |
|---------|------|
| Topology đúng cấu trúc | 20 |
| Controller hoạt động | 25 |
| VLAN + QoS | 20 |
| Failover < 3s | 15 |
| Dashboard | 10 |
| Tài liệu kỹ thuật | 10 |
| **Tổng** | **100** |
` },
      { id:'s10-2', title:'Dự án: IoT SDN Gateway', md:`
## Dự án 2 — Software-Defined IoT Gateway

### Mô tả

Gateway điều phối mạng IoT với khả năng phân loại và prioritize thiết bị.

**Phân loại thiết bị:**
- Sensor nodes (nhiều, traffic thấp, độ trễ thấp)
- IP Camera (ít, traffic cao, bandwidth đảm bảo)
- Actuator (ít, yêu cầu độ tin cậy cao)

**Yêu cầu:**
- Auto-discovery thiết bị khi kết nối
- Camera: guaranteed 30Mbps/stream
- Sensor: max latency 10ms
- Actuator: reliable delivery (không drop)
- REST API: đăng ký/hủy thiết bị

### Kiến trúc hệ thống

\`\`\`
IoT Devices ──► Edge Switch ──► IoT Gateway ──► Internet
                    ↕                 ↕
              OVS (OpenFlow)    Ryu Controller
                                      ↕
                                  REST API
                                      ↕
                                 Management
\`\`\`

### Điểm bonus

- Machine learning phân loại traffic: +15%
- Web dashboard thời gian thực: +10%
- Unit tests coverage >80%: +5%
` },
      { id:'s10-3', title:'Đề thi mẫu — Lý thuyết', md:`
## Đề thi Giữa kỳ — Lý thuyết (45 phút, 10 điểm)

### Câu 1 (2đ): Kiến trúc SDN
Giải thích kiến trúc 3 tầng của SDN. Vẽ sơ đồ và mô tả vai trò của northbound/southbound interface.

*Gợi ý: Application → Controller (NB), Controller → Switch (SB = OpenFlow)*

---

### Câu 2 (2đ): Mininet Internals
Mininet sử dụng cơ chế gì để tạo network ảo? So sánh với VM và Docker container.

---

### Câu 3 (3đ): OpenFlow Packet Processing
Mô tả quá trình xử lý packet trong OpenFlow switch từ khi đến đến khi forward. Vẽ flow diagram cho:
- Trường hợp 1: Có matching flow entry
- Trường hợp 2: Không có flow entry (table-miss)

---

### Câu 4 (3đ): SDN Controller Comparison
So sánh Ryu, ONOS, OpenDaylight theo: kiến trúc, language, use case, scalability, community.
Đề xuất controller phù hợp cho từng scenario: (a) Học tập/nghiên cứu, (b) Enterprise campus, (c) Telco/carrier
` },
      { id:'s10-4', title:'Đề thi mẫu — Thực hành', md:`
## Đề thi Cuối kỳ — Thực hành (90 phút, 10 điểm)

### Câu 1 (2.5đ): Topology
Tạo 2-tier data center topology:
- 2 core switch, 4 aggregation switch, 8 edge switch
- Mỗi edge switch: 3 hosts (tổng 24 hosts)
- Core-Agg: 10Gbps, Agg-Edge: 1Gbps, Edge-Host: 100Mbps
- Verify: pingall 0% dropped

### Câu 2 (3.5đ): SDN Controller
Viết Ryu controller:
- L2 learning với idle_timeout=60
- ACL: Chặn VLAN 10 → VLAN 20 (one-way)
- QoS: Guaranteed 10Mbps/host với HTB
- Ghi log mọi Packet-In với timestamp

### Câu 3 (2.5đ): Test & Verify
Script tự động:
- Kiểm tra full connectivity
- Verify ACL policy hoạt động đúng
- Đo bandwidth trung bình giữa các pods
- Simulate 1 link failure và đo recovery time

### Câu 4 (1.5đ): Báo cáo
- Sơ đồ topology (vẽ tay hoặc ASCII)
- Phân tích 5 flow entries quan trọng nhất
- Nhận xét hiệu suất và đề xuất cải tiến
` },
    ],
    quiz:[],
    exercises:[
      { id:'ex10-1', title:'Campus Network đầy đủ', diff:'hard', desc:'Implement đầy đủ Campus Network theo spec trong phần Dự án 1. Nộp source code + báo cáo kỹ thuật.'},
      { id:'ex10-2', title:'IoT Gateway', diff:'hard', desc:'Implement IoT Gateway với 3 loại thiết bị, QoS, auto-discovery và REST API.'},
    ]
  },
]

export const topos = [
  {
    id:'t1', name:'Minimal', cmd:'sudo mn',
    desc:'Topology mặc định: 1 switch, 2 hosts, 1 controller',
    nodes:[
      {id:'c0',type:'ctrl',label:'c0',x:310,y:35},
      {id:'s1',type:'sw',label:'s1',x:310,y:130},
      {id:'h1',type:'host',label:'h1\n10.0.0.1',x:170,y:235},
      {id:'h2',type:'host',label:'h2\n10.0.0.2',x:450,y:235},
    ],
    links:[
      {f:'c0',t:'s1',of:true},{f:'s1',t:'h1'},{f:'s1',t:'h2'},
    ]
  },
  {
    id:'t2', name:'Linear (4)', cmd:'sudo mn --topo linear,4',
    desc:'4 switch nối tiếp, mỗi switch 1 host',
    nodes:[
      {id:'c0',type:'ctrl',label:'c0',x:310,y:28},
      {id:'s1',type:'sw',label:'s1',x:90,y:130},{id:'s2',type:'sw',label:'s2',x:230,y:130},
      {id:'s3',type:'sw',label:'s3',x:370,y:130},{id:'s4',type:'sw',label:'s4',x:510,y:130},
      {id:'h1',type:'host',label:'h1',x:90,y:235},{id:'h2',type:'host',label:'h2',x:230,y:235},
      {id:'h3',type:'host',label:'h3',x:370,y:235},{id:'h4',type:'host',label:'h4',x:510,y:235},
    ],
    links:[
      {f:'c0',t:'s1',of:true},{f:'s1',t:'s2'},{f:'s2',t:'s3'},{f:'s3',t:'s4'},
      {f:'s1',t:'h1'},{f:'s2',t:'h2'},{f:'s3',t:'h3'},{f:'s4',t:'h4'},
    ]
  },
  {
    id:'t3', name:'Tree (d=2,f=3)', cmd:'sudo mn --topo tree,2,3',
    desc:'Cây 2 tầng, fanout 3 — 9 hosts',
    nodes:[
      {id:'c0',type:'ctrl',label:'c0',x:305,y:22},
      {id:'s1',type:'sw',label:'s1',x:305,y:95},
      {id:'s2',type:'sw',label:'s2',x:105,y:185},{id:'s3',type:'sw',label:'s3',x:305,y:185},{id:'s4',type:'sw',label:'s4',x:505,y:185},
      {id:'h1',type:'host',label:'h1',x:35,y:290},{id:'h2',type:'host',label:'h2',x:105,y:290},{id:'h3',type:'host',label:'h3',x:175,y:290},
      {id:'h4',type:'host',label:'h4',x:235,y:290},{id:'h5',type:'host',label:'h5',x:305,y:290},{id:'h6',type:'host',label:'h6',x:375,y:290},
      {id:'h7',type:'host',label:'h7',x:435,y:290},{id:'h8',type:'host',label:'h8',x:505,y:290},{id:'h9',type:'host',label:'h9',x:575,y:290},
    ],
    links:[
      {f:'c0',t:'s1',of:true},{f:'s1',t:'s2'},{f:'s1',t:'s3'},{f:'s1',t:'s4'},
      {f:'s2',t:'h1'},{f:'s2',t:'h2'},{f:'s2',t:'h3'},
      {f:'s3',t:'h4'},{f:'s3',t:'h5'},{f:'s3',t:'h6'},
      {f:'s4',t:'h7'},{f:'s4',t:'h8'},{f:'s4',t:'h9'},
    ]
  },
  {
    id:'t4', name:'2-Tier Data Center', cmd:'python3 dc_topo.py',
    desc:'2 core + 4 edge + 12 hosts — mô hình data center',
    nodes:[
      {id:'c0',type:'ctrl',label:'c0',x:305,y:22},
      {id:'cr1',type:'sw',label:'core1',x:185,y:95},{id:'cr2',type:'sw',label:'core2',x:425,y:95},
      {id:'e1',type:'sw',label:'e1',x:65,y:195},{id:'e2',type:'sw',label:'e2',x:185,y:195},
      {id:'e3',type:'sw',label:'e3',x:305,y:195},{id:'e4',type:'sw',label:'e4',x:425,y:195},
      {id:'h1',type:'host',label:'h1',x:25,y:295},{id:'h2',type:'host',label:'h2',x:65,y:295},{id:'h3',type:'host',label:'h3',x:105,y:295},
      {id:'h4',type:'host',label:'h4',x:145,y:295},{id:'h5',type:'host',label:'h5',x:185,y:295},{id:'h6',type:'host',label:'h6',x:225,y:295},
      {id:'h7',type:'host',label:'h7',x:265,y:295},{id:'h8',type:'host',label:'h8',x:305,y:295},{id:'h9',type:'host',label:'h9',x:345,y:295},
      {id:'h10',type:'host',label:'h10',x:385,y:295},{id:'h11',type:'host',label:'h11',x:425,y:295},{id:'h12',type:'host',label:'h12',x:465,y:295},
    ],
    links:[
      {f:'c0',t:'cr1',of:true},{f:'c0',t:'cr2',of:true},
      {f:'cr1',t:'e1'},{f:'cr1',t:'e2'},{f:'cr1',t:'e3'},{f:'cr1',t:'e4'},
      {f:'cr2',t:'e1'},{f:'cr2',t:'e2'},{f:'cr2',t:'e3'},{f:'cr2',t:'e4'},
      {f:'e1',t:'h1'},{f:'e1',t:'h2'},{f:'e1',t:'h3'},
      {f:'e2',t:'h4'},{f:'e2',t:'h5'},{f:'e2',t:'h6'},
      {f:'e3',t:'h7'},{f:'e3',t:'h8'},{f:'e3',t:'h9'},
      {f:'e4',t:'h10'},{f:'e4',t:'h11'},{f:'e4',t:'h12'},
    ]
  }
]

export const glossary = [
  {term:'SDN',full:'Software Defined Networking',def:'Kiến trúc mạng tách biệt control plane khỏi data plane, cho phép lập trình mạng qua phần mềm'},
  {term:'OpenFlow',full:'OpenFlow Protocol',def:'Giao thức southbound chuẩn để SDN Controller giao tiếp với switch/router'},
  {term:'OVS',full:'Open vSwitch',def:'Software switch mã nguồn mở hỗ trợ OpenFlow, dùng làm switch ảo trong Mininet'},
  {term:'Flow Table',full:'Flow Table',def:'Bảng lưu các flow entry quy định cách xử lý từng loại packet trong switch'},
  {term:'Control Plane',full:'Control Plane',def:'Mặt phẳng điều khiển — quyết định đường đi của traffic'},
  {term:'Data Plane',full:'Data Plane / Forwarding Plane',def:'Mặt phẳng dữ liệu — thực hiện chuyển tiếp packet theo quyết định của control plane'},
  {term:'Northbound API',full:'Northbound Interface',def:'API để ứng dụng bậc cao giao tiếp với SDN Controller'},
  {term:'Southbound API',full:'Southbound Interface',def:'API để Controller giao tiếp với network devices (OpenFlow là southbound chuẩn nhất)'},
  {term:'Namespace',full:'Linux Network Namespace',def:'Cơ chế cô lập mạng của Linux kernel, mỗi namespace có routing table, iptables, interfaces riêng'},
  {term:'TCLink',full:'Traffic Control Link',def:'Link Mininet cho phép cấu hình bandwidth, delay, packet loss, jitter'},
  {term:'DPID',full:'Datapath ID',def:'ID 64-bit định danh duy nhất mỗi OpenFlow switch trong mạng'},
  {term:'Packet-In',full:'OpenFlow Packet-In',def:'Message từ switch lên controller khi packet không khớp flow entry nào'},
  {term:'Packet-Out',full:'OpenFlow Packet-Out',def:'Message từ controller xuống switch để forward packet hoặc inject packet'},
  {term:'Table-miss',full:'Table-miss Flow Entry',def:'Flow entry priority=0 match=all xử lý packet khi không có rule nào khớp'},
  {term:'ONOS',full:'Open Network OS',def:'SDN Controller carrier-grade cho mạng service provider, phát triển bởi ONF'},
  {term:'ODL',full:'OpenDaylight',def:'SDN Controller enterprise mã nguồn mở, phát triển bởi Linux Foundation'},
  {term:'Veth',full:'Virtual Ethernet Pair',def:'Cặp interface ảo kết nối trực tiếp như dây mạng, dùng trong Mininet và Docker'},
  {term:'ECMP',full:'Equal Cost Multi-Path',def:'Kỹ thuật phân phối traffic đều trên nhiều đường có chi phí bằng nhau'},
  {term:'Slicing',full:'Network Slicing',def:'Chia một hạ tầng mạng vật lý thành nhiều mạng ảo độc lập (multi-tenant)'},
  {term:'Fat Tree',full:'Fat Tree Topology',def:'Topology cây với full bisection bandwidth, phổ biến trong Data Center'},
  {term:'RTT',full:'Round Trip Time',def:'Thời gian gói tin đi từ nguồn đến đích và quay lại nguồn'},
  {term:'Bisection BW',full:'Bisection Bandwidth',def:'Bandwidth tổng hợp khi chia mạng làm 2 nửa bằng nhau — thước đo quan trọng của DC topology'},
  {term:'Intent',full:'Network Intent',def:'Trong ONOS: chính sách mạng cấp cao (host-to-host connectivity) thay vì flow rules cụ thể'},
  {term:'Meter',full:'OpenFlow Meter',def:'Cơ chế rate limiting trong OpenFlow 1.3+ để implement QoS'},
  {term:'MPLS',full:'Multi-Protocol Label Switching',def:'Kỹ thuật chuyển mạch nhãn tốc độ cao, thường dùng kết hợp với SDN trong WAN'},
]

// src/data/projects.js
// Cập nhật v2 — đa controller, đề tài thực tiễn hơn, bỏ 3 lab cơ bản
// Mỗi đề tài có 2–4 lựa chọn controller với hướng dẫn cụ thể

export const projects = [
  // ── CƠ BẢN (p1–p5) ──────────────────────────────────────────────────────
  // Lưu ý: p1-p3 cũ (linear topo, web server, ARP capture) đã được chuyển
  // thành bài lab tuần 1 — không đủ chiều sâu SDN để làm đề tài độc lập.
  {
    id: 'p1', level: 'Cơ bản', color: '#00e676',
    title: 'Phân tích giao thức ARP/ICMP/TCP',
    time: '3 giờ',
    desc: 'Dùng tcpdump capture ARP, ICMP, TCP handshake trong Mininet. Phân tích với Wireshark. Hiểu packet flow trước khi đưa vào SDN controller.',
    skills: ['tcpdump', 'Wireshark', 'Protocols', 'Mininet'],
    deliver: ['capture.pcap', 'analysis.pdf'],
    controllers: [
      {
        name: 'Không cần controller',
        note: 'Mặc định — Mininet dùng OVS với controller mặc định, chỉ cần CLI',
        recommended: true,
      },
    ],
    steps: [
      'Tạo topology đơn giản: 1 switch, 3 host (h1, h2, h3)',
      'Capture traffic: h1 tcpdump -i h1-eth0 -w capture.pcap &',
      'Sinh ARP traffic: h1 arping -c 5 10.0.0.2',
      'Sinh ICMP: h1 ping -c 10 h2 và h1 ping -c 10 h3',
      'Sinh TCP traffic: h2 iperf3 -s & rồi h1 iperf3 -c h2',
      'Dừng capture, copy capture.pcap ra host thật',
      'Mở Wireshark, lọc theo giao thức: arp / icmp / tcp',
      'Phân tích TCP 3-way handshake: SYN, SYN-ACK, ACK',
      'Viết analysis.pdf mô tả từng giao thức kèm ảnh chụp Wireshark',
    ],
    rec: false,
    recReason: null,
  },
  {
    id: 'p2', level: 'Cơ bản', color: '#00e676',
    title: 'Ping mesh & latency heatmap',
    time: '2 giờ',
    desc: 'Tạo tree topology depth=2 fanout=3. Đo RTT toàn bộ cặp host, vẽ heatmap latency bằng matplotlib.',
    skills: ['CLI', 'Python', 'matplotlib', 'Mininet'],
    deliver: ['ping_mesh.py', 'latency_heatmap.png'],
    controllers: [
      {
        name: 'Không cần controller',
        note: 'Mặc định — chạy mn --topo tree trực tiếp, không cần Ryu hay ONOS',
        recommended: true,
      },
    ],
    steps: [
      'Tạo topology: mn --topo tree,depth=2,fanout=3 (9 host)',
      'Lấy danh sách tất cả host từ net.hosts trong Python API',
      'Vòng lặp Python đo ping giữa mọi cặp host: host.cmd("ping -c 3 ...")',
      'Parse output lấy RTT avg, lưu vào ma trận NxN',
      'Dùng matplotlib + seaborn vẽ heatmap với color bar',
      'Chú thích trục X/Y bằng tên host, thêm title và label',
      'Lưu file latency_heatmap.png độ phân giải 300 dpi',
      'Đóng gói toàn bộ vào ping_mesh.py chạy 1 lệnh duy nhất',
    ],
    rec: false,
    recReason: null,
  },
  {
    id: 'p3', level: 'Cơ bản', color: '#00e676',
    title: 'Custom topology với Python API',
    time: '3 giờ',
    desc: 'Dùng Mininet Python API tạo topology hình sao 1 switch trung tâm, 8 host với IP tĩnh. Kiểm tra pingall.',
    skills: ['Python API', 'Mininet', 'IP config'],
    deliver: ['star_topo.py', 'test_connectivity.sh'],
    controllers: [
      {
        name: 'Không cần controller',
        note: 'Mặc định — dùng OVS với controller=None hoặc default learning',
        recommended: true,
      },
    ],
    steps: [
      'Import Mininet modules: Mininet, Topo, OVSSwitch, Host',
      'Tạo class StarTopo(Topo) override phương thức build()',
      'Trong build(): addSwitch("s1"), addHost("h1"..."h8") với ip="10.0.x.y/24"',
      'addLink(s1, hN) cho tất cả 8 host',
      'Khởi tạo net = Mininet(topo=StarTopo())',
      'Gán IP tĩnh: net["hN"].cmd("ifconfig h1-eth0 10.0.0.1/24")',
      'Chạy net.pingAll() và ghi log kết quả ra file',
      'Viết test_connectivity.sh kiểm tra từng link, in PASS/FAIL',
    ],
    rec: false,
    recReason: null,
  },
  {
    id: 'p4', level: 'Cơ bản', color: '#00e676',
    title: 'QoS & Traffic Shaping với TCLink',
    time: '4 giờ',
    desc: 'Cấu hình bandwidth, delay, loss khác nhau cho từng link dùng TCLink. Verify với iperf3 và vẽ biểu đồ so sánh.',
    skills: ['TCLink', 'iperf3', 'QoS', 'Python', 'matplotlib'],
    deliver: ['qos_topo.py', 'results.csv', 'plot.png'],
    controllers: [
      {
        name: 'Không cần controller',
        note: 'Mặc định — QoS hoạt động ở kernel (tc/HTB), không cần SDN controller',
        recommended: true,
      },
    ],
    steps: [
      'Import TCLink từ mininet.link — cung cấp tc/HTB kernel queuing',
      'Tạo topology với link params khác nhau: bw=10, bw=50, bw=100 Mbps',
      'Thêm delay và loss: TCLink(delay="10ms", loss=1)',
      'Khởi động iperf3 server trên h1: h1 iperf3 -s &',
      'Đo bandwidth từng link: hX iperf3 -c h1 -t 10 -J (JSON output)',
      'Parse JSON, lưu kết quả bandwidth thực đo vào results.csv',
      'Vẽ bar chart: so sánh cấu hình bw vs thực tế đo được bằng matplotlib',
      'Kiểm tra fairness giữa các luồng chia sẻ cùng link',
    ],
    rec: false,
    recReason: null,
  },
  {
    id: 'p5', level: 'Cơ bản', color: '#00e676',
    title: 'So sánh OpenFlow Hub vs Learning Switch',
    time: '3 giờ',
    desc: 'Implement Hub (flood all) và Learning Switch (unicast) bằng controller. Đo số packet flood, bandwidth tiêu thụ, phân tích sự khác biệt.',
    skills: ['OpenFlow', 'Python', 'tcpdump', 'Wireshark'],
    deliver: ['hub.py', 'l2_switch.py', 'comparison_report.md'],
    controllers: [
      {
        name: 'Ryu',
        note: 'Khuyên dùng — tài liệu tốt, dễ debug với ryu-manager',
        recommended: true,
      },
      {
        name: 'POX',
        note: 'Nhẹ hơn Ryu, phù hợp máy yếu (<4GB RAM). Dùng: pox.py forwarding.l2_learning',
        recommended: false,
      },
    ],
    steps: [
      'Viết hub.py: mọi PACKET_IN đều flood ra OFPP_FLOOD — không học MAC',
      'Viết l2_switch.py: dùng dict mac_to_port, học MAC nguồn mỗi gói',
      'Nếu biết MAC đích: gửi unicast + install flow rule',
      'Nếu chưa biết: flood (lần này là hợp lệ, không phải mọi gói)',
      'Chạy Mininet 4 host, kết nối hub.py — dùng tcpdump đếm gói flood',
      'Đổi sang l2_switch.py — đo lại, so sánh số gói mỗi host nhận',
      'Đo bandwidth tiêu thụ: h1 iperf3 → h2, quan sát h3/h4 có nhận không',
      'Viết comparison_report.md: bảng số liệu, giải thích nguyên lý',
    ],
    rec: true,
    recReason: 'Điểm khởi đầu bắt buộc của SDN. Hiểu Hub vs Learning Switch = nắm vững Packet-In, Packet-Out, Flow-Mod — 3 primitive của mọi SDN app.',
  },

  // ── TRUNG BÌNH (p6–p13) ──────────────────────────────────────────────────
  {
    id: 'p6', level: 'Trung bình', color: '#00d4ff',
    title: 'SDN L2 Learning Switch nâng cao',
    time: '4 giờ',
    desc: 'Viết L2 learning switch đầy đủ: idle/hard timeout, tự xóa flow cũ, log bảng MAC. Đo hiệu năng với pingall và iperf3.',
    skills: ['OpenFlow', 'Python', 'Flow timeout', 'Logging'],
    deliver: ['l2_switch.py', 'test_script.py', 'report.md'],
    controllers: [
      {
        name: 'Ryu',
        note: 'Khuyên dùng — RyuApp, OFPPacketIn, OFPFlowMod đã có sẵn',
        recommended: true,
      },
      {
        name: 'POX',
        note: 'Dùng pox.py openflow.of_01 + viết component riêng, phù hợp máy yếu',
        recommended: false,
      },
      {
        name: 'Faucet',
        note: 'Cấu hình bằng YAML thay code Python, phù hợp sinh viên không thích lập trình nhiều',
        recommended: false,
      },
    ],
    steps: [
      'Cài đặt controller (Ryu: pip install ryu, hoặc POX: git clone pox)',
      'Tạo l2_switch.py: implement mac_to_port = {} làm bảng MAC learning',
      'Xử lý PACKET_IN: học MAC nguồn, tra cứu MAC đích',
      'Install flow rule với idle_timeout=10, hard_timeout=30',
      'Xử lý PORT_STATUS: xóa entry MAC khi port down',
      'Log bảng MAC ra file theo định dạng: timestamp, MAC, port, switch',
      'Chạy Ryu: ryu-manager l2_switch.py, kết nối Mininet --controller remote',
      'Dùng tcpdump so sánh số gói flood lần 1 (chưa học) vs lần 2 (đã học)',
      'Viết test_script.py: kiểm tra auto, đo số flow rule trên mỗi switch',
      'Tổng hợp report.md: thuật toán, kết quả, so sánh với hub',
    ],
    rec: true,
    recReason: 'Nền tảng bắt buộc. Nắm L2 Learning Switch = hiểu OpenFlow pipeline. Mọi đề tài nâng cao đều dùng lại kiến thức này.',
  },
  {
    id: 'p7', level: 'Trung bình', color: '#00d4ff',
    title: 'SDN Firewall cơ bản',
    time: '5 giờ',
    desc: 'SDN firewall chặn traffic giữa subnets. Implement allow/deny rules từ JSON config, log violations.',
    skills: ['OpenFlow', 'Security', 'Python', 'JSON config'],
    deliver: ['firewall.py', 'rules.json', 'test_cases.py', 'security_report.md'],
    controllers: [
      {
        name: 'Ryu',
        note: 'Khuyên dùng — dễ inject flow rule từ code Python',
        recommended: true,
      },
      {
        name: 'ONOS',
        note: 'Dùng Intent Framework để define allow/deny, gần production hơn',
        recommended: false,
      },
      {
        name: 'Faucet',
        note: 'Định nghĩa ACL trong YAML faucet.yaml, không cần viết controller code',
        recommended: false,
      },
    ],
    steps: [
      'Thiết kế chính sách: 2 subnet (10.0.1.0/24 và 10.0.2.0/24), mặc định deny',
      'Tạo rules.json: [{"src": "10.0.1.0/24", "dst": "10.0.2.0/24", "action": "deny"}]',
      'Viết firewall.py: load rules từ JSON khi khởi động',
      'Xử lý PACKET_IN: parse IP header, so khớp với rule table',
      'Match ALLOW: install flow priority cao; không match: install DROP flow',
      'Logging: mỗi violation ghi vào violations.log (src IP, dst IP, timestamp)',
      'Tạo test topology: 4 host, 2 subnet, 1 switch',
      'Viết test_cases.py: kiểm tra kịch bản allow/deny tự động, in PASS/FAIL',
      'Thêm tính năng reload rule không cần restart controller',
      'Tổng hợp security_report.md: kiến trúc, test results, phân tích',
    ],
    rec: true,
    recReason: 'Bảo mật mạng có tính ứng dụng thực tế cao. Logic tập trung dễ trình bày hơn iptables. Có logging tạo dữ liệu phong phú cho chương đánh giá luận văn.',
  },
  {
    id: 'p8', level: 'Trung bình', color: '#00d4ff',
    title: 'VLAN segmentation với OVS',
    time: '4 giờ',
    desc: 'Phân chia 8 host thành 3 VLAN trên cùng switch. Kiểm tra cô lập traffic, cấu hình trunk port giữa 2 switch.',
    skills: ['OVS', 'VLAN', 'OpenFlow', '802.1Q'],
    deliver: ['vlan_topo.py', 'vlan_test.sh', 'vlan_report.md'],
    controllers: [
      {
        name: 'OVS CLI',
        note: 'Mặc định — cấu hình VLAN tag trực tiếp qua ovs-vsctl, không cần controller riêng',
        recommended: true,
      },
      {
        name: 'Ryu',
        note: 'Implement VLAN enforcement bằng OpenFlow match vlan_vid',
        recommended: false,
      },
      {
        name: 'Faucet',
        note: 'VLAN config thuần YAML: dễ nhất, ít code nhất, phù hợp máy yếu',
        recommended: false,
      },
    ],
    steps: [
      'Tạo topology: 2 OVS switch, 8 host, phân nhóm VLAN 10/20/30',
      'Cấu hình access port: ovs-vsctl set port hN-eth0 tag=VLAN_ID',
      'Cấu hình trunk port giữa 2 switch: trunks=[10,20,30]',
      'Cài flow rule: chỉ forward cùng VLAN ID, drop khác VLAN',
      'Ping kiểm tra: cùng VLAN = thành công, khác VLAN = thất bại',
      'Dùng tcpdump xác nhận tag VLAN 802.1Q trong frame',
      'Kiểm tra trunk port truyền đúng VLAN tag giữa 2 switch',
      'Viết vlan_test.sh tự động hóa 20 test cases pass/fail',
      'Viết vlan_report.md: thiết kế, kết quả test, phân tích cô lập',
    ],
    rec: false,
    recReason: null,
  },
  {
    id: 'p9', level: 'Trung bình', color: '#00d4ff',
    title: 'Link failure & Fast Failover',
    time: '5 giờ',
    desc: 'Topology dual-path, giả lập đứt link, đo thời gian khôi phục kết nối với OpenFlow Fast-Failover Group Table.',
    skills: ['OpenFlow Groups', 'Failover', 'Python', 'Measurement'],
    deliver: ['failover_topo.py', 'failover_ctrl.py', 'failover_test.py'],
    controllers: [
      {
        name: 'Ryu',
        note: 'Khuyên dùng — hỗ trợ Group Table API trực tiếp trong Python',
        recommended: true,
      },
      {
        name: 'ONOS',
        note: 'Có sẵn Fast Failover qua FailoverGroup Intent, cấu hình qua REST',
        recommended: false,
      },
    ],
    steps: [
      'Tạo topology dual-path: h1-s1-(s2,s3)-s4-h2 (2 đường song song)',
      'Implement Ryu controller: cài OpenFlow Group Table loại FF (Fast Failover)',
      'Cấu hình bucket primary (qua s2) và backup (qua s3) với watch_port',
      'Script giả lập link failure: net.configLinkStatus("s1", "s2", "down")',
      'Đo failover time bằng ping -i 0.1 và đếm số gói mất',
      'So sánh thời gian phục hồi: FF Group vs reactive controller',
      'Restore link, kiểm tra traffic tự động về đường chính',
      'Lặp 20 lần, tính mean/std failover time, vẽ box plot bằng matplotlib',
    ],
    rec: false,
    recReason: null,
  },
  {
    id: 'p10', level: 'Trung bình', color: '#00d4ff',
    title: 'SDN Load Balancer',
    time: '5 giờ',
    desc: 'Implement load balancer Layer-4 bằng OpenFlow: round-robin phân phối request đến nhiều server, đo hiệu quả phân tải với ab/iperf3.',
    skills: ['OpenFlow', 'Python', 'Load Balancing', 'iperf3'],
    deliver: ['lb_ctrl.py', 'lb_topo.py', 'test_lb.py', 'report.md'],
    controllers: [
      {
        name: 'Ryu',
        note: 'Khuyên dùng — xử lý PACKET_IN để rewrite dst IP/MAC về server backend',
        recommended: true,
      },
      {
        name: 'ONOS',
        note: 'Dùng VIP Intent hoặc viết app Java, gần production hơn nhưng phức tạp hơn',
        recommended: false,
      },
      {
        name: 'POX',
        note: 'Nhẹ, đủ dùng cho load balancer cơ bản, phù hợp máy yếu',
        recommended: false,
      },
    ],
    steps: [
      'Thiết kế topology: 1 client, 1 virtual IP (VIP), 3 server backend (10.0.0.10-12)',
      'Viết lb_topo.py: client - switch - 3 server, VIP = 10.0.0.100',
      'Xử lý ARP Request tới VIP: trả ARP Reply với MAC của switch (proxy ARP)',
      'Xử lý TCP SYN tới VIP: chọn server theo round-robin, rewrite dst IP + dst MAC',
      'Install flow rule 2 chiều: forward và reverse NAT đúng connection',
      'Viết test_lb.py: gửi 30 request từ client, kiểm tra phân phối đều',
      'Đo throughput tổng: ab -n 1000 -c 20 http://10.0.0.100/ ',
      'So sánh với single-server: thời gian response, throughput tổng',
      'Viết report.md: thiết kế NAT, kết quả đo, giới hạn của round-robin',
    ],
    rec: true,
    recReason: 'Ứng dụng thực tế cao, demo trực quan. Kết hợp được proxy ARP, NAT, flow rule management — 3 kỹ năng thực tiễn của SDN.',
  },
  {
    id: 'p11', level: 'Trung bình', color: '#00d4ff',
    title: 'Network monitoring dashboard',
    time: '6 giờ',
    desc: 'Thu thập port stats từ OVS theo polling, hiển thị real-time trên Flask dashboard với Chart.js. Cảnh báo khi vượt ngưỡng.',
    skills: ['Flask', 'Chart.js', 'REST', 'Python', 'SQLite'],
    deliver: ['monitor.py', 'dashboard/', 'README.md'],
    controllers: [
      {
        name: 'Ryu',
        note: 'Khuyên dùng — dùng Ryu REST API để poll port stats, tích hợp sẵn',
        recommended: true,
      },
      {
        name: 'ONOS',
        note: 'REST API /onos/v1/statistics/ports/{deviceId} trả JSON chuẩn hơn',
        recommended: false,
      },
      {
        name: 'OVS CLI',
        note: 'Poll trực tiếp qua ovs-ofctl dump-ports, không cần controller Python',
        recommended: false,
      },
    ],
    steps: [
      'Viết collector.py: poll Ryu REST /stats/port/{dpid} mỗi 5 giây',
      'Parse JSON, tính delta bytes/packets giữa 2 lần đo → throughput thực',
      'Lưu time-series vào SQLite: (timestamp, dpid, port, rx_bytes, tx_bytes)',
      'Tạo Flask app: GET /api/metrics trả JSON cho frontend',
      'Dùng Server-Sent Events (SSE) push data real-time về browser',
      'Frontend: Chart.js line chart bandwidth, bar chart packet rate',
      'Thêm trang topology: hiển thị switch/host dạng node-link đơn giản',
      'Logic cảnh báo: nếu port vượt 80% bandwidth → highlight đỏ trên dashboard',
      'Viết README.md: cài đặt, chạy thử, giải thích từng component',
    ],
    rec: false,
    recReason: null,
  },
  {
    id: 'p12', level: 'Trung bình', color: '#00d4ff',
    title: 'Multipath routing với Equal-Cost Multipath (ECMP)',
    time: '5 giờ',
    desc: 'Tạo topology có nhiều đường bằng nhau giữa 2 điểm, implement ECMP hashing để phân tải đều. Chuẩn bị nền tảng cho Fat Tree.',
    skills: ['OpenFlow', 'ECMP', 'Python', 'Hashing'],
    deliver: ['ecmp_ctrl.py', 'multipath_topo.py', 'benchmark.py', 'comparison.md'],
    controllers: [
      {
        name: 'Ryu',
        note: 'Khuyên dùng — tự tính hash 5-tuple và chọn port bằng Python',
        recommended: true,
      },
      {
        name: 'ONOS',
        note: 'Có sẵn ECMP qua Equal Cost Multipath routing service',
        recommended: false,
      },
    ],
    steps: [
      'Tạo topology: h1-s1-(s2,s3,s4)-s5-h2 (3 đường song song bằng nhau)',
      'Implement controller: khi nhận packet, tính hash 5-tuple (src/dst IP, port, proto)',
      'hash mod 3 để chọn đường đi (s2, s3, hoặc s4)',
      'Install flow rule cho từng (src IP, dst IP) pair theo đường đã chọn',
      'Sinh traffic từ nhiều cặp host, quan sát phân phối trên 3 đường',
      'Đo utilization từng link bằng iperf3 song song, so sánh cân bằng',
      'So sánh ECMP vs single-path: tổng throughput, Jain fairness index',
      'Thay hash bằng round-robin: so sánh 2 chiến lược phân tải',
      'Viết comparison.md: ưu nhược của từng chiến lược, khi nào dùng cái gì',
    ],
    rec: false,
    recReason: null,
  },
  {
    id: 'p13', level: 'Trung bình', color: '#00d4ff',
    title: 'REST API controller — quản lý mạng qua HTTP',
    time: '5 giờ',
    desc: 'Expose REST API để thêm/xóa flow rules, đọc topology và stats qua HTTP. Viết client Python tự động hóa quản lý mạng.',
    skills: ['REST API', 'Python', 'Flask', 'OpenFlow'],
    deliver: ['rest_ctrl.py', 'api_client.py', 'api_docs.md'],
    controllers: [
      {
        name: 'Ryu',
        note: 'Khuyên dùng — bật wsgi + ofctl_rest để có REST sẵn, hoặc tự viết bằng RyuApp',
        recommended: true,
      },
      {
        name: 'ONOS',
        note: 'ONOS có REST API cực kỳ đầy đủ, dùng Swagger UI để test trực tiếp',
        recommended: false,
      },
    ],
    steps: [
      'Khởi động Ryu với --observe-links và wsgi module để bật REST',
      'Implement GET /switches — lấy danh sách switch đang kết nối',
      'Implement POST /flow/{dpid} — cài flow rule từ JSON body',
      'Implement DELETE /flow/{dpid}/{flow_id} — xóa flow rule',
      'Implement GET /stats/{dpid} — lấy port/flow statistics',
      'Viết api_client.py với class NetworkManager bao gói HTTP calls',
      'Demo use-case thực tế: tự động block IP theo giờ cao điểm',
      'Viết api_docs.md theo chuẩn OpenAPI: endpoint, request/response schema, ví dụ',
    ],
    rec: false,
    recReason: null,
  },

  // ── NÂNG CAO (p14–p20) ──────────────────────────────────────────────────
  {
    id: 'p14', level: 'Nâng cao', color: '#c792ea',
    title: 'SDN Intrusion Detection System (IDS)',
    time: '10 giờ',
    desc: 'Phát hiện các loại tấn công mạng (DDoS, port scan, ARP spoofing) từ flow statistics và entropy analysis. Tự động block và sinh alert.',
    skills: ['Security', 'Python', 'Statistics', 'Entropy', 'OpenFlow'],
    deliver: ['ids_detector.py', 'mitigation.py', 'ids_report.pdf'],
    controllers: [
      {
        name: 'Ryu',
        note: 'Khuyên dùng — poll flow stats qua REST, inject drop rule bằng Python',
        recommended: true,
      },
      {
        name: 'ONOS',
        note: 'Dùng FlowObjective API để block attacker, thêm GUI ONOS để trực quan hóa',
        recommended: false,
      },
    ],
    steps: [
      'Topology: nhiều attacker host + victim + benign traffic + Ryu controller',
      'Sinh traffic DDoS: h_atk hping3 -S --flood -V -p 80 10.0.0.1',
      'Sinh port scan: h_atk nmap -p 1-1000 10.0.0.1',
      'Sinh ARP spoofing: h_atk arpspoof -i eth0 -t 10.0.0.1 10.0.0.2',
      'Implement polling: mỗi 5s lấy flow stats qua Ryu REST API',
      'Phát hiện DDoS: tính entropy của IP nguồn trong cửa sổ thời gian trượt',
      'Phát hiện port scan: đếm số dst port khác nhau từ cùng 1 src IP',
      'Phát hiện ARP spoofing: so sánh MAC-IP binding với bảng tin cậy',
      'Khi phát hiện: gửi Flow-Mod drop với match IP src của attacker',
      'Sinh alert log: timestamp, attack type, attacker IP, traffic volume',
      'Đo precision/recall của từng loại phát hiện trong nhiều kịch bản',
      'Viết ids_report.pdf theo chuẩn IEEE: Abstract, Method, Evaluation',
    ],
    rec: true,
    recReason: 'Chủ đề thời sự, kết hợp bảo mật với phân tích thống kê. Bao quát nhiều loại tấn công hơn DDoS đơn thuần. Phù hợp làm luận văn tốt nghiệp.',
  },
  {
    id: 'p15', level: 'Nâng cao', color: '#c792ea',
    title: 'Campus SDN network tích hợp',
    time: '20 giờ',
    desc: 'Mạng campus 3 tòa nhà đầy đủ: VLAN phân loại người dùng, QoS ưu tiên dịch vụ, failover <3s, monitoring dashboard Flask.',
    skills: ['Multi-VLAN', 'QoS', 'Failover', 'Flask', 'Python'],
    deliver: ['Toàn bộ source', 'Dashboard', 'Tài liệu kỹ thuật', 'Demo video'],
    controllers: [
      {
        name: 'Ryu',
        note: 'Khuyên dùng cho prototype — dễ kết hợp VLAN, QoS, REST trong cùng 1 app',
        recommended: true,
      },
      {
        name: 'ONOS',
        note: 'Production-grade hơn: dùng SegmentRouting + GroupConfig + REST, phù hợp luận văn xuất sắc',
        recommended: false,
      },
      {
        name: 'Faucet',
        note: 'Config toàn bộ VLAN + QoS + ACL qua YAML faucet.yaml, ít code nhất',
        recommended: false,
      },
    ],
    steps: [
      'Thiết kế kiến trúc: 3 building switch, distribution layer, core switch',
      'Quy hoạch VLAN: sinh viên (10), giảng viên (20), IoT (30), quản trị (99)',
      'Cài inter-VLAN routing với L3 switch hoặc dedicated router host',
      'Cấu hình QoS: EF queue cho VoIP, AF cho giảng dạy, BE cho sinh viên',
      'Implement failover: dual uplink, detect <500ms, switchover <3s',
      'Viết Flask monitoring: real-time traffic per VLAN, alert khi vượt ngưỡng',
      'Load test: sinh traffic 80% capacity, kiểm tra SLA từng dịch vụ',
      'Viết tài liệu kỹ thuật chuẩn: requirements, design, implementation, test',
      'Quay demo video end-to-end toàn bộ tính năng',
    ],
    rec: false,
    recReason: null,
  },
  {
    id: 'p16', level: 'Nâng cao', color: '#c792ea',
    title: 'Fat Tree k=4 với ECMP',
    time: '8 giờ',
    desc: 'Data center topology Fat Tree k=4 + ECMP load balancing. Đo bisection bandwidth, so sánh với single path. Tham chiếu paper Al-Fares 2008.',
    skills: ['Fat Tree', 'ECMP', 'Python', 'Performance', 'OpenFlow'],
    deliver: ['fat_tree.py', 'ecmp_ctrl.py', 'benchmark.md'],
    controllers: [
      {
        name: 'Ryu',
        note: 'Khuyên dùng — implement ECMP hash 5-tuple hoàn toàn bằng Python',
        recommended: true,
      },
      {
        name: 'ONOS',
        note: 'Dùng SegmentRouting app của ONOS — có ECMP built-in, gần production hơn',
        recommended: false,
      },
    ],
    steps: [
      'Nghiên cứu cấu trúc Fat Tree k=4: 20 switch, 16 host, 3 tier (edge, aggregation, core)',
      'Viết fat_tree.py theo công thức: k pods, k/2 edge switch/pod, k/2 aggr switch/pod, (k/2)² core switch',
      'Đặt địa chỉ IP theo scheme chuẩn: 10.pod.switch.host',
      'Implement ECMP trong controller: tìm nhiều equal-cost paths giữa mọi cặp',
      'Hash 5-tuple (src IP, dst IP, src port, dst port, proto) để chọn path nhất quán',
      'Benchmark bisection bandwidth: iperf3 all-to-all 2 nhóm 8 host',
      'So sánh với single-path: throughput tổng, Jain fairness index',
      'Vẽ CDF throughput mỗi flow trong 2 kịch bản bằng matplotlib',
      'Viết benchmark.md: phân tích, so sánh số liệu với kết quả trong paper Al-Fares 2008',
    ],
    rec: true,
    recReason: 'Fat Tree là topology chuẩn của data center hiện đại. Có paper gốc SIGCOMM 2008 để so sánh số liệu — rất có giá trị trong luận văn.',
  },
  {
    id: 'p17', level: 'Nâng cao', color: '#c792ea',
    title: 'Network Slicing trong SDN',
    time: '12 giờ',
    desc: 'Chia cùng hạ tầng vật lý thành nhiều virtual network slice độc lập, mỗi slice có băng thông/latency SLA riêng. Xu hướng của 5G.',
    skills: ['OpenFlow', 'Python', 'QoS', 'Isolation', 'FlowVisor-like'],
    deliver: ['slice_manager.py', 'slice_topo.py', 'sla_monitor.py', 'report.pdf'],
    controllers: [
      {
        name: 'Ryu',
        note: 'Khuyên dùng — implement slice isolation bằng VLAN tag + flow rule riêng mỗi slice',
        recommended: true,
      },
      {
        name: 'ONOS',
        note: 'Dùng Virtual Network (VNet) service của ONOS, đúng chuẩn hơn',
        recommended: false,
      },
    ],
    steps: [
      'Thiết kế 3 slice: slice A (VoIP, latency < 5ms), slice B (video, bw > 50Mbps), slice C (best-effort)',
      'Viết slice_manager.py: tạo/xóa/sửa slice qua REST API',
      'Mỗi slice được cấp VLAN range riêng (10-19, 20-29, 30-39)',
      'Cài flow rule riêng biệt cho mỗi slice, không overlap match fields',
      'Gán băng thông tối đa cho mỗi slice bằng TCLink + meter table',
      'Implement slice isolation: packet từ slice A không thể đi sang slice B',
      'Viết sla_monitor.py: đo latency/throughput thực tế của từng slice',
      'Sinh tải cao trên slice C, kiểm tra slice A/B không bị ảnh hưởng',
      'So sánh trước/sau khi có slicing: cải thiện SLA đo được',
      'Viết report.pdf: thiết kế, kết quả đo, liên hệ với Network Slicing trong 5G',
    ],
    rec: true,
    recReason: 'Đề tài xu hướng liên quan trực tiếp đến 5G. Dễ liên kết với nghiên cứu thực tế, phù hợp làm luận văn có tính mới.',
  },
  {
    id: 'p18', level: 'Nâng cao', color: '#c792ea',
    title: 'Deep Reinforcement Learning routing',
    time: '12 giờ',
    desc: 'DQN agent học chính sách định tuyến tối ưu trong môi trường mạng động mô phỏng với Mininet + custom Gym environment.',
    skills: ['PyTorch', 'DQN', 'OpenAI Gym', 'Python', 'Ryu'],
    deliver: ['drl_agent.py', 'mininet_env.py', 'training_log.csv', 'report.pdf'],
    controllers: [
      {
        name: 'Ryu',
        note: 'Khuyên dùng — agent gọi Ryu REST API để thay đổi routing, đơn giản nhất',
        recommended: true,
      },
    ],
    steps: [
      'Thiết kế môi trường Gym: state (link utilization vector), action (chọn path index), reward (-latency)',
      'Viết mininet_env.py implement gym.Env: reset(), step(), observation_space, action_space',
      'Tạo DQN network PyTorch: FC layers, input=state_size, output=num_actions',
      'Implement experience replay buffer (capacity=10000) và target network',
      'Training loop: agent tương tác môi trường, epsilon-greedy exploration',
      'Sinh traffic ngẫu nhiên trong training (thay đổi load liên tục)',
      'Mỗi episode log: avg latency, packet loss, cumulative reward',
      'So sánh DQN với shortest-path và random routing sau khi training xong',
      'Vẽ learning curve: cumulative reward và avg latency theo episode',
      'Viết report.pdf: thiết kế MDP, kết quả training, so sánh các chiến lược',
    ],
    rec: false,
    recReason: null,
  },
  {
    id: 'p19', level: 'Nâng cao', color: '#c792ea',
    title: 'Intent-based networking với NLP',
    time: '12 giờ',
    desc: 'Pipeline NLP nhận câu lệnh tiếng Anh ("block traffic from 10.0.0.1"), dịch tự động thành OpenFlow rules và apply lên mạng.',
    skills: ['NLP', 'spaCy', 'Python', 'REST', 'OpenFlow'],
    deliver: ['intent_parser.py', 'rule_generator.py', 'demo_video.mp4'],
    controllers: [
      {
        name: 'Ryu',
        note: 'Khuyên dùng — rule_generator gọi Ryu REST API để push flow rule',
        recommended: true,
      },
      {
        name: 'ONOS',
        note: 'Dùng ONOS Intent Framework — phù hợp hơn về mặt khái niệm IBN',
        recommended: false,
      },
    ],
    steps: [
      'Định nghĩa ngữ pháp intent: VERB + OBJECT + FROM/TO + IP/SUBNET + [PORT]',
      'Huấn luyện NER model spaCy nhận diện IP, port, protocol entity',
      'Viết intent_parser.py: parse câu → dict {action, src, dst, proto, port}',
      'Viết rule_generator.py: dict → OpenFlow match + action JSON',
      'Kết nối Ryu REST API để push rule tự động lên switch',
      'Test 30+ câu lệnh tiếng Anh đa dạng, đo accuracy parse',
      'Xử lý trường hợp mơ hồ: in ra xác nhận trước khi apply rule',
      'Quay demo video: nhập câu, xem rule apply real-time trong Mininet',
    ],
    rec: false,
    recReason: null,
  },
  {
    id: 'p20', level: 'Nâng cao', color: '#c792ea',
    title: 'P4 programmable dataplane với BMv2',
    time: '16 giờ',
    desc: 'Viết P4 program tùy chỉnh header processing, compile với p4c, chạy trên BMv2 software switch. Implement In-band Network Telemetry (INT).',
    skills: ['P4', 'BMv2', 'p4c', 'Python', 'P4Runtime'],
    deliver: ['basic.p4', 'int_telemetry.p4', 'control_plane.py', 'p4_report.pdf'],
    controllers: [
      {
        name: 'BMv2 + P4Runtime',
        note: 'Mặc định — P4 thay thế controller truyền thống, dùng simple_switch_grpc',
        recommended: true,
      },
      {
        name: 'ONOS + P4',
        note: 'ONOS hỗ trợ P4Runtime natively qua PI Framework, gần production nhất',
        recommended: false,
      },
    ],
    steps: [
      'Cài p4c compiler và bmv2 (behavioral model v2)',
      'Nghiên cứu P4 pipeline: parser → ingress (match-action) → egress → deparser',
      'Viết basic.p4: định nghĩa header Ethernet, IPv4',
      'Implement parser: extract headers từ packet bytes dựa theo etherType',
      'Viết match-action table: IPv4 forward dựa theo dst IP longest-prefix match',
      'Compile: p4c --target bmv2 --arch v1model basic.p4',
      'Khởi chạy BMv2 trong Mininet thay OVS: simple_switch_grpc',
      'Viết control_plane.py dùng P4Runtime gRPC để populate table entries',
      'Test: ping, iperf3, xác nhận forward đúng',
      'Mở rộng: thêm int_telemetry.p4 — nhúng metadata latency vào packet header',
      'Viết p4_report.pdf: giải thích P4 pipeline, so sánh với OpenFlow',
    ],
    rec: false,
    recReason: null,
  },
]

export const resources = [
  {cat:'📚 Tài liệu chính thức',items:[
    {name:'Mininet Walkthrough',url:'http://mininet.org/walkthrough/',desc:'Hướng dẫn chính thức đầy đủ nhất'},
    {name:'Mininet Python API',url:'http://mininet.org/api/',desc:'Reference đầy đủ Python API'},
    {name:'OpenFlow Spec 1.3',url:'https://opennetworking.org',desc:'Đặc tả giao thức OpenFlow 1.3'},
    {name:'Ryu Book',url:'https://osrg.github.io/ryu-book/en/html/',desc:'Hướng dẫn viết Ryu application'},
    {name:'ONOS Wiki',url:'https://wiki.onosproject.org',desc:'Tài liệu ONOS Controller'},
  ]},
  {cat:'🎓 Khóa học trực tuyến',items:[
    {name:'Coursera: SDN Specialization',url:'https://www.coursera.org/specializations/sdn',desc:'Princeton University — SDN 4 khóa chuyên sâu'},
    {name:'edX: SDN Fundamentals',url:'https://www.edx.org',desc:'Linux Foundation — Giới thiệu SDN miễn phí'},
    {name:'YouTube: Nick Feamster SDN',url:'https://www.youtube.com',desc:'Giáo sư Princeton giảng dạy SDN online'},
  ]},
  {cat:'💻 GitHub Resources',items:[
    {name:'mininet/mininet',url:'https://github.com/mininet/mininet',desc:'Source code Mininet chính thức'},
    {name:'osrg/ryu',url:'https://github.com/osrg/ryu',desc:'Ryu SDN Framework + Examples'},
    {name:'opennetworkinglab/onos',url:'https://github.com/opennetworkinglab/onos',desc:'ONOS Controller source'},
    {name:'intrig-unicamp/mininet-wifi',url:'https://github.com/intrig-unicamp/mininet-wifi',desc:'Mininet với WiFi/wireless support'},
    {name:'noxrepo/pox',url:'https://github.com/noxrepo/pox',desc:'POX Controller — đơn giản cho học tập'},
  ]},
  {cat:'🔧 Tools & Utilities',items:[
    {name:'Wireshark',url:'https://wireshark.org',desc:'Packet analyzer — bắt buộc phải có'},
    {name:'Open vSwitch',url:'https://openvswitch.org',desc:'OVS documentation và releases'},
    {name:'iperf3',url:'https://iperf.fr',desc:'Network bandwidth measurement tool'},
    {name:'draw.io',url:'https://draw.io',desc:'Vẽ sơ đồ mạng miễn phí'},
  ]},
]
